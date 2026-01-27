import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, Cart, CartItem } from '../../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cart: Cart | null = null;
  loading = false;
  error: string | null = null;

  // Mock userId - in production, get from AuthService
  userId = 'user-123';

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.error = null;

    this.cartService.getCart(this.userId).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load cart. Please try again.';
        this.loading = false;
        console.error('Error loading cart:', err);
      },
    });
  }

  increaseQuantity(item: CartItem): void {
    this.cartService
      .updateCartItem({
        userId: this.userId,
        cartItemId: item.id,
        quantity: item.quantity + 1,
      })
      .subscribe({
        next: () => {
          // Cart will auto-refresh via service
        },
        error: (err) => {
          this.error = 'Failed to update quantity.';
          console.error('Error updating quantity:', err);
        },
      });
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService
        .updateCartItem({
          userId: this.userId,
          cartItemId: item.id,
          quantity: item.quantity - 1,
        })
        .subscribe({
          next: () => {
            // Cart will auto-refresh via service
          },
          error: (err) => {
            this.error = 'Failed to update quantity.';
            console.error('Error updating quantity:', err);
          },
        });
    }
  }

  removeItem(item: CartItem): void {
    if (confirm(`Remove ${item.productName} from cart?`)) {
      this.cartService.removeFromCart(this.userId, item.id).subscribe({
        next: () => {
          // Cart will auto-refresh via service
        },
        error: (err) => {
          this.error = 'Failed to remove item.';
          console.error('Error removing item:', err);
        },
      });
    }
  }

  get subtotal(): number {
    return this.cart?.grandTotal || 0;
  }

  get tax(): number {
    return this.subtotal * 0.1; // 10% tax
  }

  get total(): number {
    return this.subtotal + this.tax;
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
