import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { ProductDetail } from '../../../core/models/entities';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: ProductDetail[] = [];
  searchTerm = '';
  selectedCategory: 'All' | ProductDetail['category'] = 'All';
  isLoading = true;
  errorMessage = '';
  private initialCategory: ProductDetail['category'] | null = null;

  constructor(
    private productsService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.initialCategory = params.get('category') as ProductDetail['category'] | null;
      if (this.initialCategory && this.categories.includes(this.initialCategory)) {
        this.selectedCategory = this.initialCategory;
      }
    });

    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        if (this.initialCategory && this.categories.includes(this.initialCategory)) {
          this.selectedCategory = this.initialCategory;
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load products right now.';
        this.isLoading = false;
      },
    });
  }

  get categories() {
    const unique = Array.from(new Set(this.products.map((item) => item.category)));
    return ['All', ...unique] as Array<'All' | ProductDetail['category']>;
  }

  get categoryOptions() {
    return this.categories.filter((category) => category !== 'All');
  }

  get brandOptions() {
    return Array.from(new Set(this.products.map((item) => item.brand)));
  }

  get filteredProducts() {
    return this.products.filter((product) => {
      const matchesCategory =
        this.selectedCategory === 'All' || product.category === this.selectedCategory;
      const matchesSearch =
        !this.searchTerm ||
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.summary.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  addToCart(product: ProductDetail) {
    // Mock userId - in production, get from AuthService
    const userId = 'user-123';

    this.cartService
      .addToCart({
        userId: userId,
        productId: product.id,
        quantity: 1,
      })
      .subscribe({
        next: () => {
          alert(`${product.name} added to cart!`);
        },
        error: (err: any) => {
          console.error('Error adding to cart:', err);
          alert('Failed to add item to cart. Please try again.');
        },
      });
  }

  toggleCategory(category: ProductDetail['category']) {
    this.selectedCategory = this.selectedCategory === category ? 'All' : category;
  }
}
