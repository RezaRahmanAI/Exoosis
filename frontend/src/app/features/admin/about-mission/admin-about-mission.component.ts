import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AboutMissionContentService } from '../../../core/services/about-mission-content.service';
import { AboutMissionContent } from '../../../core/models/catalog';

@Component({
  selector: 'app-admin-about-mission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">About Mission Management</h2>
          <p class="text-gray-500 text-sm">Manage the mission block shown on the About page.</p>
        </div>
        <button
          (click)="openModal()"
          class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <span class="material-symbols-outlined">add</span>
          Add Mission Content
        </button>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div
          *ngFor="let item of missionList"
          class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase">
              {{ item.eyebrow || 'Mission' }}
            </span>
            <span
              *ngIf="item.isActive"
              class="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase"
            >
              Active
            </span>
          </div>
          <h3 class="font-bold text-lg text-gray-800">{{ item.title }}</h3>
          <p class="text-gray-500 text-sm line-clamp-2">{{ item.text1 }}</p>

          <div class="flex gap-3 pt-2">
            <button (click)="openModal(item)" class="text-xs font-bold text-primary hover:underline">Edit</button>
            <button (click)="deleteMission(item.id)" class="text-xs font-bold text-red-500 hover:underline">Remove</button>
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
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
            <h3 class="text-xl font-bold text-gray-800">{{ currentMission.id ? 'Edit' : 'Add' }} Mission Content</h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Eyebrow</label>
                <input
                  [(ngModel)]="currentMission.eyebrow"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                  placeholder="Our Mission"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Title</label>
                <input
                  [(ngModel)]="currentMission.title"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                  placeholder="Driving Digital Transformation"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Text 1</label>
              <textarea
                [(ngModel)]="currentMission.text1"
                rows="3"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
              ></textarea>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Text 2</label>
              <textarea
                [(ngModel)]="currentMission.text2"
                rows="3"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
              ></textarea>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Quote</label>
              <textarea
                [(ngModel)]="currentMission.quote"
                rows="2"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
              ></textarea>
            </div>

            <div class="flex items-center gap-3">
              <input
                type="checkbox"
                [(ngModel)]="currentMission.isActive"
                id="aboutMissionActive"
                class="size-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label for="aboutMissionActive" class="text-sm font-bold text-gray-700">Active Content</label>
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
              (click)="saveMission()"
              class="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all"
            >
              Save Mission Content
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminAboutMissionComponent implements OnInit {
  missionList: AboutMissionContent[] = [];
  isModalOpen = false;
  currentMission: Partial<AboutMissionContent> = {};

  constructor(private missionService: AboutMissionContentService) {}

  ngOnInit() {
    this.loadMissionList();
  }

  loadMissionList() {
    this.missionService.getAll().subscribe((data) => (this.missionList = data));
  }

  openModal(item: AboutMissionContent | null = null) {
    this.currentMission = item ? { ...item } : { isActive: true, eyebrow: 'Our Mission' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveMission() {
    if (this.currentMission.id) {
      this.missionService.update(this.currentMission.id, this.currentMission).subscribe(() => {
        this.loadMissionList();
        this.closeModal();
      });
    } else {
      this.missionService.create(this.currentMission).subscribe(() => {
        this.loadMissionList();
        this.closeModal();
      });
    }
  }

  deleteMission(id: string) {
    if (confirm('Are you sure you want to remove this mission content?')) {
      this.missionService.delete(id).subscribe(() => this.loadMissionList());
    }
  }

  setActive(item: AboutMissionContent) {
    this.missionService.update(item.id, { ...item, isActive: true }).subscribe(() => {
      this.loadMissionList();
    });
  }
}
