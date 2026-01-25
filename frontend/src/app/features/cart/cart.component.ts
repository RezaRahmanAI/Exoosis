import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { CartItem } from '../../core/models/entities';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  customerName = '';
  customerPhone = '';
  customerAddress = '';
  orderPlaced = false;

  constructor(private cartService: CartService, private authService: AuthService) {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.customerName = user.name;
      }
    });
  }

  get cartItems$() {
    return this.cartService.cartItems$;
  }

  get cartTotal$() {
    return this.cartService.cartTotal$;
  }


  updateQuantity(item: CartItem, quantity: number) {
    this.cartService.updateQuantity(item, quantity).subscribe();
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item.id).subscribe();
  }

  placeOrder() {
    if (!this.customerName || !this.customerPhone || !this.customerAddress) {
      return;
    }

    this.cartService.placeOrder({
      customerName: this.customerName,
      customerPhone: this.customerPhone,
      customerAddress: this.customerAddress
    }).subscribe(() => {
      this.orderPlaced = true;
      this.customerPhone = '';
      this.customerAddress = '';
    });
  }
}
