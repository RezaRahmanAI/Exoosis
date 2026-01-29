import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AboutCoreValueService } from '../../../core/services/about-core-value.service';
import { AboutCoreValue } from '../../../core/models/catalog';

@Component({
  selector: 'app-admin-about-core-values',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">About Core Values</h2>
          <p class="text-gray-500 text-sm">Manage the core values displayed on the About page.</p>
        </div>
        <button
          (click)="openModal()"
          class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <span class="material-symbols-outlined">add</span>
          Add Core Value
        </button>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div
          *ngFor="let item of valueList"
          class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">{{ item.icon }}</span>
            <h3 class="font-bold text-lg text-gray-800">{{ item.title }}</h3>
            <span
              *ngIf="item.isActive"
              class="ml-auto px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase"
            >
              Active
            </span>
          </div>
          <p class="text-gray-500 text-sm">{{ item.description }}</p>

          <div class="flex gap-3 pt-2">
            <button (click)="openModal(item)" class="text-xs font-bold text-primary hover:underline">Edit</button>
            <button (click)="deleteValue(item.id)" class="text-xs font-bold text-red-500 hover:underline">Remove</button>
            <button
              *ngIf="!item.isActive"
              (click)="setActive(item)"
              class="ml-auto text-xs font-bold text-green-600 hover:underline"
            >
              Set as Active
            </button>
          </div>
        </div>
      </div>

      <div
        *ngIf="isModalOpen"
        class="fixed inset-0 bg-navy-blue/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
            <h3 class="text-xl font-bold text-gray-800">{{ currentValue.id ? 'Edit' : 'Add' }} Core Value</h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Title</label>
              <input
                [(ngModel)]="currentValue.title"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                placeholder="Customer-Centric"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Icon</label>
              <input
                [(ngModel)]="currentValue.icon"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                placeholder="handshake"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Description</label>
              <textarea
                [(ngModel)]="currentValue.description"
                rows="3"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
              ></textarea>
            </div>
            <div class="flex items-center gap-3">
              <input
                type="checkbox"
                [(ngModel)]="currentValue.isActive"
                id="aboutCoreValueActive"
                class="size-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label for="aboutCoreValueActive" class="text-sm font-bold text-gray-700">Active Content</label>
            </div>
          </div>
          <div class="p-6 bg-gray-50 flex gap-3 justify-end sticky bottom-0 z-10">
            <button
              (click)="closeModal()"
              class="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-white transition-all"
            >
              Cancel
            </button>
            <button
              (click)="saveValue()"
              class="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all"
            >
              Save Core Value
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminAboutCoreValuesComponent implements OnInit {
  valueList: AboutCoreValue[] = [];
  isModalOpen = false;
  currentValue: Partial<AboutCoreValue> = {};

  constructor(private coreValueService: AboutCoreValueService) {}

  ngOnInit() {
    this.loadValueList();
  }

  loadValueList() {
    this.coreValueService.getAll().subscribe((data) => (this.valueList = data));
  }

  openModal(item: AboutCoreValue | null = null) {
    this.currentValue = item ? { ...item } : { isActive: true };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveValue() {
    if (this.currentValue.id) {
      this.coreValueService.update(this.currentValue.id, this.currentValue).subscribe(() => {
        this.loadValueList();
        this.closeModal();
      });
    } else {
      this.coreValueService.create(this.currentValue).subscribe(() => {
        this.loadValueList();
        this.closeModal();
      });
    }
  }

  deleteValue(id: string) {
    if (confirm('Are you sure you want to remove this core value?')) {
      this.coreValueService.delete(id).subscribe(() => this.loadValueList());
    }
  }

  setActive(item: AboutCoreValue) {
    this.coreValueService.update(item.id, { ...item, isActive: true }).subscribe(() => {
      this.loadValueList();
    });
  }
}
