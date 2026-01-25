import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { CartService } from '../../../core/services/cart.service';
import { ProductDetail } from '../../../core/models/entities';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: ProductDetail[] = [];
  searchTerm = '';
  selectedCategory: 'All' | ProductDetail['category'] = 'All';
  isLoading = true;
  errorMessage = '';

  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit() {
    this.api.get<ProductDetail[]>('/products').subscribe({
      next: data => {
        this.products = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load products right now.';
        this.isLoading = false;
      }
    });
  }

  get categories() {
    const unique = Array.from(new Set(this.products.map(item => item.category)));
    return ['All', ...unique] as Array<'All' | ProductDetail['category']>;
  }

  get filteredProducts() {
    return this.products.filter(product => {
      const matchesCategory = this.selectedCategory === 'All' || product.category === this.selectedCategory;
      const matchesSearch = !this.searchTerm
        || product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        || product.summary.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  addToCart(product: ProductDetail) {
    this.cartService.addToCart(product).subscribe();
  }
}
