import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';
import { ProductDetail } from '../../../core/models/entities';

interface CategoryCard {
  name: ProductDetail['category'];
  count: number;
  description: string;
  imageUrl: string;
  brands: string[];
}

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  categoryCards: CategoryCard[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private categoriesService: CategoryService,
    private productsService: ProductService,
  ) {}

  ngOnInit() {
    forkJoin({
      categories: this.categoriesService.getCategories(),
      products: this.productsService.getProducts(),
    }).subscribe({
      next: ({ categories, products }) => {
        this.categoryCards = categories.map((category) => {
          const productsInCategory = products.filter(
            (product) => product.category === category.name,
          );
          const brands = Array.from(
            new Set(productsInCategory.map((product) => product.brand)),
          ).slice(0, 4);

          return {
            name: category.name,
            count: productsInCategory.length,
            description: category.description ?? '',
            imageUrl: category.imageUrl || '',
            brands,
          };
        });
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load categories right now.';
        this.isLoading = false;
      },
    });
  }
}
