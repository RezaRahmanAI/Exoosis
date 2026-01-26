import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrandService } from '../../../core/services/brand.service';
import { ApiBrand } from '../../../core/models/catalog';

@Component({
  selector: 'app-admin-brands',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Manage Brands</h2>
          <p class="text-gray-500 text-sm">Create and update partner brand profiles</p>
        </div>
        <button (click)="openModal()" class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined">add_business</span>
          Add Brand
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div *ngFor="let brand of brands" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow relative">
          <div class="size-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
            <img *ngIf="brand.logoUrl" [src]="brand.logoUrl" [alt]="brand.name" class="h-10 w-auto object-contain" />
            <span *ngIf="!brand.logoUrl" class="text-[10px] font-semibold text-gray-400">No logo</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-gray-800 truncate">{{brand.name}}</h3>
              <span *ngIf="!brand.isActive" class="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[10px] font-bold uppercase">Inactive</span>
            </div>
            <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{brand.description || 'No description provided yet.'}}</p>
            <div class="flex gap-2">
              <button (click)="openModal(brand)" class="text-xs font-bold text-primary hover:underline">Edit</button>
              <button (click)="deleteBrand(brand.id)" class="text-xs font-bold text-red-500 hover:underline">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="isModalOpen" class="fixed inset-0 bg-navy-blue/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 class="text-xl font-bold text-gray-800">{{ currentBrand.id ? 'Edit' : 'Add' }} Brand</h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Name</label>
              <input [(ngModel)]="currentBrand.name" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Brand name">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Description</label>
              <textarea [(ngModel)]="currentBrand.description" rows="3" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Short description"></textarea>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Logo URL</label>
              <input [(ngModel)]="currentBrand.logoUrl" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="https://">
            </div>
            <div class="flex items-center gap-3">
              <input type="checkbox" [(ngModel)]="currentBrand.isActive" id="brandActive" class="size-4 rounded border-gray-300 text-primary focus:ring-primary">
              <label for="brandActive" class="text-sm font-bold text-gray-700">Active Partner</label>
            </div>
          </div>
          <div class="p-6 bg-gray-50 flex gap-3 justify-end">
            <button (click)="closeModal()" class="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-white transition-all">Cancel</button>
            <button (click)="saveBrand()" class="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all">Save Brand</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminBrandsComponent implements OnInit {
  brands: ApiBrand[] = [];
  isModalOpen = false;
  currentBrand: Partial<ApiBrand> = {};

  constructor(private brandService: BrandService) {}

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
    this.brandService.getBrands().subscribe(data => this.brands = data);
  }

  openModal(brand: ApiBrand | null = null) {
    this.currentBrand = brand ? { ...brand } : { isActive: true };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveBrand() {
    if (this.currentBrand.id) {
      this.brandService.updateBrand(this.currentBrand.id, {
        name: this.currentBrand.name ?? '',
        description: this.currentBrand.description,
        logoUrl: this.currentBrand.logoUrl,
        isActive: this.currentBrand.isActive
      }).subscribe(() => {
        this.loadBrands();
        this.closeModal();
      });
    } else {
      this.brandService.createBrand({
        name: this.currentBrand.name ?? '',
        description: this.currentBrand.description,
        logoUrl: this.currentBrand.logoUrl,
        isActive: this.currentBrand.isActive
      }).subscribe(() => {
        this.loadBrands();
        this.closeModal();
      });
    }
  }

  deleteBrand(id: string) {
    if (confirm('Are you sure you want to remove this brand?')) {
      this.brandService.deleteBrand(id).subscribe(() => this.loadBrands());
    }
  }
}
