import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from './api.service';
import { OrderService } from './order.service';
import { CartItem, OrderPayload, ProductDetail } from '../models/entities';
import { ApiResponse } from '../models/api-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private readonly mockStorageKey = 'exoosis_mock_cart_items';
  cartCount$ = this.cartItems$.pipe(
    map((items) => items.reduce((total, item) => total + item.quantity, 0)),
  );
  cartTotal$ = this.cartItems$.pipe(
    map((items) => items.reduce((total, item) => total + item.price * item.quantity, 0)),
  );

  constructor(
    private api: ApiService,
    private orderService: OrderService,
  ) {
    this.loadCart().subscribe();
  }

  loadCart() {
    if (environment.useMockData) {
      const items = this.loadMockCart();
      this.cartItemsSubject.next(items);
      return of(items);
    }

    return this.api.get<ApiResponse<CartItem[]>>('/cart').pipe(
      map((response) => response.data || []),
      tap((items) => this.cartItemsSubject.next(items)),
    );
  }

  addToCart(product: ProductDetail, quantity = 1) {
    if (environment.useMockData) {
      return this.addToMockCart(product, quantity);
    }

    const existing = this.cartItemsSubject.value.find((item) => item.productId === product.id);
    if (existing) {
      const updated = { ...existing, quantity: existing.quantity + quantity };
      return this.api.put<ApiResponse<CartItem[]>>(`/cart/${existing.id}`, updated).pipe(
        map((response) => response.data || []),
        tap((items) => this.cartItemsSubject.next(items)),
      );
    }

    const newItem: Omit<CartItem, 'id'> = {
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      priceUnit: product.priceUnit,
      quantity,
      image: product.image,
    };

    return this.api.post<ApiResponse<CartItem[]>>('/cart', newItem).pipe(
      map((response) => response.data || []),
      tap((items) => this.cartItemsSubject.next(items)),
    );
  }

  updateQuantity(item: CartItem, quantity: number) {
    if (environment.useMockData) {
      return this.updateMockQuantity(item, quantity);
    }

    if (quantity <= 0) {
      return this.removeItem(item.id);
    }

    const updated = { ...item, quantity };
    return this.api
      .put<CartItem>(`/cart/${item.id}`, updated)
      .pipe(switchMap(() => this.loadCart()));
  }

  removeItem(itemId: number) {
    if (environment.useMockData) {
      return this.removeMockItem(itemId);
    }

    return this.api.delete(`/cart/${itemId}`).pipe(switchMap(() => this.loadCart()));
  }

  clearCart() {
    if (environment.useMockData) {
      return this.clearMockCart();
    }

    const items = this.cartItemsSubject.value;
    if (!items.length) {
      return of([]);
    }

    return forkJoin(items.map((item) => this.api.delete(`/cart/${item.id}`))).pipe(
      switchMap(() => this.loadCart()),
    );
  }

  placeOrder(payload: Omit<OrderPayload, 'id' | 'placedAt' | 'items' | 'total'>) {
    const items = this.cartItemsSubject.value;
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order: Omit<OrderPayload, 'id'> = {
      ...payload,
      placedAt: new Date().toISOString(),
      status: 'Processing',
      total,
      items,
    };

    return this.orderService.createOrder(order).pipe(
      switchMap(() => this.clearCart()),
      map(() => undefined),
    );
  }

  private loadMockCart(): CartItem[] {
    const stored = localStorage.getItem(this.mockStorageKey);
    if (!stored) {
      return [];
    }

    try {
      return JSON.parse(stored) as CartItem[];
    } catch {
      return [];
    }
  }

  private saveMockCart(items: CartItem[]) {
    localStorage.setItem(this.mockStorageKey, JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }

  private addToMockCart(product: ProductDetail, quantity: number) {
    const items = this.loadMockCart();
    const existing = items.find((item) => item.productId === product.id);

    if (existing) {
      const updated = items.map((item) =>
        item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item,
      );
      this.saveMockCart(updated);
      return of(updated);
    }

    const nextId = items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    const newItem: CartItem = {
      id: nextId,
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      priceUnit: product.priceUnit,
      quantity,
      image: product.image,
    };

    const updated = [...items, newItem];
    this.saveMockCart(updated);
    return of(updated);
  }

  private updateMockQuantity(item: CartItem, quantity: number) {
    if (quantity <= 0) {
      return this.removeMockItem(item.id);
    }

    const items = this.loadMockCart();
    const updated = items.map((existing) =>
      existing.id === item.id ? { ...existing, quantity } : existing,
    );
    this.saveMockCart(updated);
    return of(updated);
  }

  private removeMockItem(itemId: number) {
    const items = this.loadMockCart();
    const updated = items.filter((item) => item.id !== itemId);
    this.saveMockCart(updated);
    return of(updated);
  }

  private clearMockCart() {
    this.saveMockCart([]);
    return of([]);
  }
}
