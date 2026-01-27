import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroContentService } from '../../../core/services/hero-content.service';
import { HeroContent } from '../../../core/models/catalog';

@Component({
  selector: 'app-admin-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Hero Section Management</h2>
          <p class="text-gray-500 text-sm">Manage home page banner content</p>
        </div>
        <button
          (click)="openModal()"
          class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <span class="material-symbols-outlined">add</span>
          Add Hero Content
        </button>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div
          *ngFor="let item of heroList"
          class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-shadow relative"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span
                  class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase"
                  >{{ item.badgeText }}</span
                >
                <span
                  *ngIf="item.isActive"
                  class="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase"
                  >Active</span
                >
              </div>
              <h3 class="font-bold text-lg text-gray-800 mt-2">{{ item.title }}</h3>
              <p class="text-gray-500 text-sm line-clamp-2">{{ item.subText }}</p>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 h-24">
            <div class="rounded-lg overflow-hidden border border-gray-100">
              <img [src]="item.image1Url" class="w-full h-full object-cover" />
            </div>
            <div class="rounded-lg overflow-hidden border border-gray-100">
              <img [src]="item.image2Url" class="w-full h-full object-cover" />
            </div>
            <div class="rounded-lg overflow-hidden border border-gray-100">
              <img [src]="item.image3Url" class="w-full h-full object-cover" />
            </div>
          </div>

          <div class="flex gap-3 pt-2">
            <button
              (click)="openModal(item)"
              class="text-xs font-bold text-primary hover:underline"
            >
              Edit
            </button>
            <button
              (click)="deleteHero(item.id)"
              class="text-xs font-bold text-red-500 hover:underline"
            >
              Remove
            </button>
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

      <!-- Modal -->
      <div
        *ngIf="isModalOpen"
        class="fixed inset-0 bg-navy-blue/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          <div
            class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10"
          >
            <h3 class="text-xl font-bold text-gray-800">
              {{ currentHero.id ? 'Edit' : 'Add' }} Hero Content
            </h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-1">
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1"
                  >Badge Text</label
                >
                <input
                  [(ngModel)]="currentHero.badgeText"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                  placeholder="e.g. ENTERPRISE TECHNOLOGY PARTNER"
                />
              </div>
              <div class="col-span-1">
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Title</label>
                <input
                  [(ngModel)]="currentHero.title"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                  placeholder="Banner title"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1"
                >Subtext / Description</label
              >
              <textarea
                [(ngModel)]="currentHero.subText"
                rows="3"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                placeholder="Brief description..."
              ></textarea>
            </div>

            <div class="space-y-3">
              <h4 class="text-sm font-bold text-gray-700">Images (URLs)</h4>
              <div>
                <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1"
                  >Image 1 (Top Small)</label
                >
                <input
                  [(ngModel)]="currentHero.image1Url"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1"
                  >Image 2 (Middle Large)</label
                >
                <input
                  [(ngModel)]="currentHero.image2Url"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-gray-400 uppercase mb-1"
                  >Image 3 (Bottom Tall)</label
                >
                <input
                  [(ngModel)]="currentHero.image3Url"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div class="flex items-center gap-3">
              <input
                type="checkbox"
                [(ngModel)]="currentHero.isActive"
                id="heroActive"
                class="size-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label for="heroActive" class="text-sm font-bold text-gray-700">Active Content</label>
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
              (click)="saveHero()"
              class="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all"
            >
              Save Hero Content
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminHeroComponent implements OnInit {
  heroList: HeroContent[] = [];
  isModalOpen = false;
  currentHero: Partial<HeroContent> = {};

  constructor(private heroService: HeroContentService) {}

  ngOnInit() {
    this.loadHeroList();
  }

  loadHeroList() {
    this.heroService.getAll().subscribe((data) => (this.heroList = data));
  }

  openModal(item: HeroContent | null = null) {
    this.currentHero = item ? { ...item } : { isActive: true };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveHero() {
    if (this.currentHero.id) {
      this.heroService.update(this.currentHero.id, this.currentHero).subscribe(() => {
        this.loadHeroList();
        this.closeModal();
      });
    } else {
      this.heroService.create(this.currentHero).subscribe(() => {
        this.loadHeroList();
        this.closeModal();
      });
    }
  }

  deleteHero(id: string) {
    if (confirm('Are you sure you want to remove this hero content?')) {
      this.heroService.delete(id).subscribe(() => this.loadHeroList());
    }
  }

  setActive(item: HeroContent) {
    this.heroService.update(item.id, { ...item, isActive: true }).subscribe(() => {
      this.loadHeroList();
    });
  }
}
