import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { BrandService } from '../../../core/services/brand.service';
import { ApiBrand, ApiCategory, ApiProduct } from '../../../core/models/catalog';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Manage Products</h2>
          <p class="text-gray-500 text-sm">Create, update, or remove catalog products</p>
        </div>
        <button (click)="openModal()" class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined">add_shopping_cart</span>
          Add Product
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div *ngFor="let product of products" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow relative">
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <h3 class="font-bold text-gray-800 truncate">{{product.name}}</h3>
              <p class="text-sm text-gray-500">{{product.categoryName || 'Uncategorized'}} · {{product.brandName || 'No brand'}}</p>
            </div>
            <span *ngIf="!product.isActive" class="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[10px] font-bold uppercase">Inactive</span>
          </div>
          <div class="text-sm text-gray-600">
            Price: <span class="font-semibold text-gray-800">{{ product.price | number:'1.0-0' }}</span>
          </div>
          <div class="text-sm text-gray-600">
            Stock: <span class="font-semibold text-gray-800">{{ product.stockQuantity }}</span>
          </div>
          <div class="flex gap-2">
            <button (click)="openModal(product)" class="text-xs font-bold text-primary hover:underline">Edit</button>
            <button (click)="deleteProduct(product.id)" class="text-xs font-bold text-red-500 hover:underline">Remove</button>
          </div>
        </div>
      </div>

      <div *ngIf="isModalOpen" class="fixed inset-0 bg-navy-blue/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 class="text-xl font-bold text-gray-800">{{ currentProduct.id ? 'Edit' : 'Add' }} Product</h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Product Name</label>
                <input [(ngModel)]="currentProduct.name" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Product name">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Category</label>
                <select [(ngModel)]="currentProduct.categoryId" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none">
                  <option [ngValue]="undefined">Select category</option>
                  <option *ngFor="let category of categories" [ngValue]="category.id">{{ category.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Brand</label>
                <select [(ngModel)]="currentProduct.brandId" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none">
                  <option [ngValue]="undefined">Select brand</option>
                  <option *ngFor="let brand of brands" [ngValue]="brand.id">{{ brand.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Price</label>
                <input type="number" [(ngModel)]="currentProduct.price" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="0">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Stock Quantity</label>
                <input type="number" [(ngModel)]="currentProduct.stockQuantity" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="0">
              </div>
              <div class="md:col-span-2">
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Image URLs</label>
                <input [(ngModel)]="currentProduct.imageUrls" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="https://image1.jpg, https://image2.jpg">
              </div>
              <div class="md:col-span-2">
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Description</label>
                <textarea [(ngModel)]="currentProduct.description" rows="3" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Short product summary"></textarea>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <input type="checkbox" [(ngModel)]="currentProduct.isActive" id="productActive" class="size-4 rounded border-gray-300 text-primary focus:ring-primary">
              <label for="productActive" class="text-sm font-bold text-gray-700">Active Product</label>
            </div>
          </div>
          <div class="p-6 bg-gray-50 flex gap-3 justify-end">
            <button (click)="closeModal()" class="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-white transition-all">Cancel</button>
            <button (click)="saveProduct()" class="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all">Save Product</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminProductsComponent implements OnInit {
  products: ApiProduct[] = [];
  categories: ApiCategory[] = [];
  brands: ApiBrand[] = [];
  isModalOpen = false;
  currentProduct: Partial<ApiProduct> = {};

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {}

  ngOnInit() {
    this.loadReferences();
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getCatalogProducts().subscribe(data => this.products = data);
  }

  loadReferences() {
    this.categoryService.getCategories().subscribe(data => this.categories = data);
    this.brandService.getBrands().subscribe(data => this.brands = data);
  }

  openModal(product: ApiProduct | null = null) {
    this.currentProduct = product ? { ...product } : {
      isActive: true,
      price: 0,
      stockQuantity: 0
    };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveProduct() {
    const payload = {
      name: this.currentProduct.name ?? '',
      description: this.currentProduct.description,
      price: Number(this.currentProduct.price ?? 0),
      categoryId: this.currentProduct.categoryId ?? '',
      brandId: this.currentProduct.brandId ?? '',
      stockQuantity: Number(this.currentProduct.stockQuantity ?? 0),
      imageUrls: this.currentProduct.imageUrls ?? '',
      isActive: this.currentProduct.isActive
    };

    if (this.currentProduct.id) {
      this.productService.updateProduct(this.currentProduct.id, payload).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    } else {
      this.productService.createProduct(payload).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    }
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to remove this product?')) {
      this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }
}
