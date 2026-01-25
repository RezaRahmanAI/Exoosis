import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from './api.service';
import { CartItem, OrderPayload, ProductDetail } from '../models/entities';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  cartCount$ = this.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + item.quantity, 0))
  );
  cartTotal$ = this.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + item.price * item.quantity, 0))
  );

  constructor(private api: ApiService) {
    this.loadCart().subscribe();
  }

  loadCart() {
    return this.api.get<CartItem[]>('/cart').pipe(
      tap(items => this.cartItemsSubject.next(items))
    );
  }

  addToCart(product: ProductDetail, quantity = 1) {
    const existing = this.cartItemsSubject.value.find(item => item.productId === product.id);
    if (existing) {
      const updated = { ...existing, quantity: existing.quantity + quantity };
      return this.api.put<CartItem>(`/cart/${existing.id}`, updated).pipe(
        switchMap(() => this.loadCart())
      );
    }

    const newItem: Omit<CartItem, 'id'> = {
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      priceUnit: product.priceUnit,
      quantity,
      image: product.image
    };

    return this.api.post<CartItem>('/cart', newItem).pipe(
      switchMap(() => this.loadCart())
    );
  }

  updateQuantity(item: CartItem, quantity: number) {
    if (quantity <= 0) {
      return this.removeItem(item.id);
    }

    const updated = { ...item, quantity };
    return this.api.put<CartItem>(`/cart/${item.id}`, updated).pipe(
      switchMap(() => this.loadCart())
    );
  }

  removeItem(itemId: number) {
    return this.api.delete(`/cart/${itemId}`).pipe(
      switchMap(() => this.loadCart())
    );
  }

  clearCart() {
    const items = this.cartItemsSubject.value;
    if (!items.length) {
      return of([]);
    }

    return forkJoin(items.map(item => this.api.delete(`/cart/${item.id}`))).pipe(
      switchMap(() => this.loadCart())
    );
  }

  placeOrder(payload: Omit<OrderPayload, 'id' | 'placedAt' | 'items' | 'total'>) {
    const items = this.cartItemsSubject.value;
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order: Omit<OrderPayload, 'id'> = {
      ...payload,
      placedAt: new Date().toISOString(),
      total,
      items
    };

    return this.api.post<OrderPayload>('/orders', order).pipe(
      switchMap(() => this.clearCart())
    );
  }
}
