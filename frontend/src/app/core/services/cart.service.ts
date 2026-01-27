import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CartItem {
  id: string; // CartItem ID
  productId: string;
  productName: string;
  productImageUrl: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  grandTotal: number;
}

export interface AddToCartDto {
  userId: string;
  productId: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  userId: string;
  cartItemId: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/Cart`;
  private cartSubject = new BehaviorSubject<Cart | null>(null);

  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCart(userId: string): Observable<Cart> {
    return this.http
      .get<Cart>(`${this.apiUrl}/${userId}`)
      .pipe(tap((cart) => this.cartSubject.next(cart)));
  }

  addToCart(item: AddToCartDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, item).pipe(
      tap(() =>
        this.getCart(item.userId) // Refresh cart after adding
          .subscribe(),
      ),
    );
  }

  updateCartItem(data: UpdateCartItemDto): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/update-item`, data)
      .pipe(tap(() => this.getCart(data.userId).subscribe()));
  }

  removeFromCart(userId: string, cartItemId: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/remove/${userId}/${cartItemId}`)
      .pipe(tap(() => this.getCart(userId).subscribe()));
  }

  clearCart(userId: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/clear/${userId}`)
      .pipe(tap(() => this.cartSubject.next(null)));
  }

  // Helper to get current cart count
  get cartCount$(): Observable<number> {
    // You can use map or signals here. For now, simple map
    // Note: RxJS map import required if using pipe on observable directly
    // But here we can just expose a derived observable from BehaviorSubject
    // or just return items count
    return new Observable<number>((observer) => {
      this.cart$.subscribe((cart) => {
        const count = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        observer.next(count);
      });
    });
  }
}
