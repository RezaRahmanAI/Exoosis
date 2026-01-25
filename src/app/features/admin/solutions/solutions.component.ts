import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Solution } from '../../../core/models/entities';

@Component({
  selector: 'app-admin-solutions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Manage Solutions</h2>
          <p class="text-gray-500 text-sm">Add, edit or remove electronics and custom software solutions</p>
        </div>
        <button (click)="openModal()" class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined">add</span>
          Add New Solution
        </button>
      </div>

      <!-- Solutions Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 text-gray-400 text-xs font-bold uppercase">
            <tr>
              <th class="px-6 py-4">Solution</th>
              <th class="px-6 py-4">Category</th>
              <th class="px-6 py-4">Focus Areas</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 text-sm">
            <tr *ngFor="let sol of solutions" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <div class="size-10 bg-blue-50 rounded-lg flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined text-xl">{{sol.icon}}</span>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 line-clamp-1">{{sol.title}}</p>
                    <p class="text-xs text-gray-400 max-w-xs truncate">{{sol.desc}}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">{{sol.category}}</span>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span *ngFor="let brand of sol.brands" class="px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500 text-[10px]">{{brand}}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <button (click)="openModal(sol)" class="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-md transition-all">
                    <span class="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button (click)="deleteSolution(sol.id)" class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all">
                    <span class="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Edit/Add Modal (Simplified) -->
      <div *ngIf="isModalOpen" class="fixed inset-0 bg-navy-blue/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 class="text-xl font-bold text-gray-800">{{ currentSol.id ? 'Edit' : 'Add' }} Solution</h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Title</label>
              <input [(ngModel)]="currentSol.title" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none" placeholder="e.g. IT Hardware">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Description</label>
              <textarea [(ngModel)]="currentSol.desc" rows="3" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none" placeholder="Enter solution details..."></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Category</label>
                <select [(ngModel)]="currentSol.category" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none appearance-none">
                  <option value="Electronics">Electronics</option>
                  <option value="Networking">Networking</option>
                  <option value="Security">Security</option>
                  <option value="Custom Software">Custom Software</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Icon</label>
                <input [(ngModel)]="currentSol.icon" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none" placeholder="e.g. computer">
              </div>
            </div>
          </div>
          <div class="p-6 bg-gray-50 flex gap-3 justify-end">
            <button (click)="closeModal()" class="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-white transition-all">Cancel</button>
            <button (click)="saveSolution()" class="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminSolutionsComponent implements OnInit {
  solutions: Solution[] = [];
  isModalOpen = false;
  currentSol: Partial<Solution> = {};

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadSolutions();
  }

  loadSolutions() {
    this.api.get<Solution[]>('/solutions').subscribe(data => this.solutions = data);
  }

  openModal(sol: Solution | null = null) {
    this.currentSol = sol ? { ...sol } : { brands: [], icon: 'grid_view', category: 'Electronics' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveSolution() {
    if (this.currentSol.id) {
      this.api.put<Solution>(`/solutions/${this.currentSol.id}`, this.currentSol).subscribe(() => {
        this.loadSolutions();
        this.closeModal();
      });
    } else {
      this.api.post<Solution>('/solutions', this.currentSol).subscribe(() => {
        this.loadSolutions();
        this.closeModal();
      });
    }
  }

  deleteSolution(id: number) {
    if (confirm('Are you sure you want to delete this solution?')) {
      this.api.delete(`/solutions/${id}`).subscribe(() => this.loadSolutions());
    }
  }
}
