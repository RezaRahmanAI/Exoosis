import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { CartService } from '../../../core/services/cart.service';
import { ProductDetail } from '../../../core/models/entities';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product?: ProductDetail;
  isLoading = true;
  errorMessage = '';
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (!productId) {
      this.isLoading = false;
      this.errorMessage = 'We could not find that product.';
      return;
    }

    this.api.get<ProductDetail>(`/products/${productId}`).subscribe({
      next: (data) => {
        this.product = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load product details right now.';
        this.isLoading = false;
      }
    });
  }

  addToCart() {
    if (!this.product) {
      return;
    }
    this.cartService.addToCart(this.product, this.quantity).subscribe();
  }

  updateQuantity(delta: number) {
    const nextValue = this.quantity + delta;
    this.quantity = Math.max(1, nextValue);
  }
}
