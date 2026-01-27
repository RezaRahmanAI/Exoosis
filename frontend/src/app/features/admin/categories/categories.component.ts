import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { ApiCategory } from '../../../core/models/catalog';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Manage Categories</h2>
          <p class="text-gray-500 text-sm">Create and update product categories</p>
        </div>
        <button (click)="openModal()" class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined">category</span>
          Add Category
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div *ngFor="let category of categories" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow relative">
          <div class="size-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
            <span class="material-symbols-outlined">category</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-gray-800 truncate">{{category.name}}</h3>
              <span *ngIf="!category.isActive" class="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[10px] font-bold uppercase">Inactive</span>
            </div>
            <div class="flex gap-2 mt-2">
              <button (click)="openModal(category)" class="text-xs font-bold text-primary hover:underline">Edit</button>
              <button (click)="deleteCategory(category.id)" class="text-xs font-bold text-red-500 hover:underline">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="isModalOpen" class="fixed inset-0 bg-navy-blue/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 class="text-xl font-bold text-gray-800">{{ currentCategory.id ? 'Edit' : 'Add' }} Category</h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Category Name</label>
              <input [(ngModel)]="currentCategory.name" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Category name">
            </div>
            <div class="flex items-center gap-3">
              <input type="checkbox" [(ngModel)]="currentCategory.isActive" id="categoryActive" class="size-4 rounded border-gray-300 text-primary focus:ring-primary">
              <label for="categoryActive" class="text-sm font-bold text-gray-700">Active Category</label>
            </div>
          </div>
          <div class="p-6 bg-gray-50 flex gap-3 justify-end">
            <button (click)="closeModal()" class="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-white transition-all">Cancel</button>
            <button (click)="saveCategory()" class="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all">Save Category</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminCategoriesComponent implements OnInit {
  categories: ApiCategory[] = [];
  isModalOpen = false;
  currentCategory: Partial<ApiCategory> = {};

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  openModal(category: ApiCategory | null = null) {
    this.currentCategory = category ? { ...category } : { isActive: true };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveCategory() {
    if (this.currentCategory.id) {
      this.categoryService.updateCategory(this.currentCategory.id, {
        name: this.currentCategory.name ?? '',
        isActive: this.currentCategory.isActive
      }).subscribe(() => {
        this.loadCategories();
        this.closeModal();
      });
    } else {
      this.categoryService.createCategory({
        name: this.currentCategory.name ?? '',
        isActive: this.currentCategory.isActive
      }).subscribe(() => {
        this.loadCategories();
        this.closeModal();
      });
    }
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure you want to remove this category?')) {
      this.categoryService.deleteCategory(id).subscribe(() => this.loadCategories());
    }
  }
}
