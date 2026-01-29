import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeroContentService } from '../../../core/services/page-hero-content.service';
import { PageHeroContent } from '../../../core/models/catalog';

@Component({
  selector: 'app-admin-page-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Page Hero Management</h2>
          <p class="text-gray-500 text-sm">Manage hero content for product, solutions, partners, about, contact, and career pages.</p>
        </div>
        <button
          (click)="openModal()"
          class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <span class="material-symbols-outlined">add</span>
          Add Page Hero
        </button>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div
          *ngFor="let item of heroList"
          class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                  {{ item.pageKey }}
                </span>
                <span
                  *ngIf="item.isActive"
                  class="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase"
                  >Active</span
                >
              </div>
              <h3 class="font-bold text-lg text-gray-800 mt-2">{{ item.title }}</h3>
              <p class="text-gray-500 text-sm line-clamp-2">{{ item.description }}</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-3 text-xs text-gray-500">
            <span *ngIf="item.eyebrow">Eyebrow: {{ item.eyebrow }}</span>
            <span *ngIf="item.badge">Badge: {{ item.badge }}</span>
          </div>

          <div class="flex gap-3 pt-2">
            <button (click)="openModal(item)" class="text-xs font-bold text-primary hover:underline">
              Edit
            </button>
            <button (click)="deleteHero(item.id)" class="text-xs font-bold text-red-500 hover:underline">
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
              {{ currentHero.id ? 'Edit' : 'Add' }} Page Hero
            </h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Page Key</label>
                <select
                  [(ngModel)]="currentHero.pageKey"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                >
                  <option value="products">products</option>
                  <option value="solutions">solutions</option>
                  <option value="partners">partners</option>
                  <option value="about">about</option>
                  <option value="contact">contact</option>
                  <option value="career">career</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Eyebrow</label>
                <input
                  [(ngModel)]="currentHero.eyebrow"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                  placeholder="Section label"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Title</label>
              <input
                [(ngModel)]="currentHero.title"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                placeholder="Hero title"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Description</label>
              <textarea
                [(ngModel)]="currentHero.description"
                rows="3"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                placeholder="Hero description"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Badge</label>
                <input
                  [(ngModel)]="currentHero.badge"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                  placeholder="Optional badge"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Badge Icon</label>
                <input
                  [(ngModel)]="currentHero.badgeIcon"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                  placeholder="material icon name"
                />
              </div>
            </div>

            <div class="flex items-center gap-3">
              <input
                type="checkbox"
                [(ngModel)]="currentHero.isActive"
                id="pageHeroActive"
                class="size-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label for="pageHeroActive" class="text-sm font-bold text-gray-700">Active Content</label>
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
              Save Page Hero
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminPageHeroComponent implements OnInit {
  heroList: PageHeroContent[] = [];
  isModalOpen = false;
  currentHero: Partial<PageHeroContent> = {};

  constructor(private pageHeroService: PageHeroContentService) {}

  ngOnInit() {
    this.loadHeroList();
  }

  loadHeroList() {
    this.pageHeroService.getAll().subscribe((data) => (this.heroList = data));
  }

  openModal(item: PageHeroContent | null = null) {
    this.currentHero = item
      ? { ...item }
      : { isActive: true, pageKey: 'products', badgeIcon: 'auto_awesome' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveHero() {
    if (this.currentHero.id) {
      this.pageHeroService.update(this.currentHero.id, this.currentHero).subscribe(() => {
        this.loadHeroList();
        this.closeModal();
      });
    } else {
      this.pageHeroService.create(this.currentHero).subscribe(() => {
        this.loadHeroList();
        this.closeModal();
      });
    }
  }

  deleteHero(id: string) {
    if (confirm('Are you sure you want to remove this page hero content?')) {
      this.pageHeroService.delete(id).subscribe(() => this.loadHeroList());
    }
  }

  setActive(item: PageHeroContent) {
    this.pageHeroService.update(item.id, { ...item, isActive: true }).subscribe(() => {
      this.loadHeroList();
    });
  }
}
