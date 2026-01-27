import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolutionService } from '../../../core/services/solution.service';
import { Solution, SolutionCategory } from '../../../core/models/entities';
import { SolutionCategoryPipe } from '../../../core/pipes/solution-category.pipe';

@Component({
  selector: 'app-admin-solutions',
  standalone: true,
  imports: [CommonModule, FormsModule, SolutionCategoryPipe],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Manage Solutions</h2>
          <p class="text-gray-500 text-sm">Add, edit or remove product and industry solutions</p>
        </div>
        <button
          (click)="openModal()"
          class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
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
              <th class="px-6 py-4">Technology Stack</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 text-sm">
            <tr *ngFor="let sol of solutions" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <div
                    class="size-10 bg-blue-50 rounded-lg flex items-center justify-center text-primary overflow-hidden"
                  >
                    <img
                      *ngIf="sol.imageUrl"
                      [src]="sol.imageUrl"
                      alt=""
                      class="w-full h-full object-cover"
                    />
                    <span *ngIf="!sol.imageUrl" class="material-symbols-outlined text-xl"
                      >grid_view</span
                    >
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 line-clamp-1">{{ sol.name }}</p>
                    <p class="text-xs text-gray-400 max-w-xs truncate">{{ sol.summary }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span
                  class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
                  >{{ sol.category | solutionCategory }}</span
                >
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span
                    *ngFor="let tech of sol.technologyStack"
                    class="px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500 text-[10px]"
                    >{{ tech }}</span
                  >
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <button
                    (click)="openModal(sol)"
                    class="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-md transition-all"
                  >
                    <span class="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button
                    (click)="deleteSolution(sol.id)"
                    class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                  >
                    <span class="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Edit/Add Modal -->
      <div
        *ngIf="isModalOpen"
        class="fixed inset-0 bg-navy-blue/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up"
        >
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 class="text-xl font-bold text-gray-800">
              {{ currentSol.id ? 'Edit' : 'Add' }} Solution
            </h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Name *</label>
              <input
                [(ngModel)]="currentSol.name"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                placeholder="e.g. Industrial Automation Suite"
                required
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Summary</label>
              <input
                [(ngModel)]="currentSol.summary"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                placeholder="Short overview..."
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1"
                >Description</label
              >
              <textarea
                [(ngModel)]="currentSol.description"
                rows="3"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                placeholder="Enter solution details..."
              ></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1"
                  >Category *</label
                >
                <select
                  [(ngModel)]="currentSol.category"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                  required
                >
                  <option [value]="SolutionCategory.Industrial">Industrial</option>
                  <option [value]="SolutionCategory.Corporate">Corporate</option>
                  <option [value]="SolutionCategory.Banking">Banking</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1"
                  >Image URL</label
                >
                <input
                  [(ngModel)]="currentSol.imageUrl"
                  class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                  placeholder="https://"
                />
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1"
                >Technology Stack (comma separated)</label
              >
              <input
                [(ngModel)]="technologyStackText"
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>
          </div>
          <div class="p-6 bg-gray-50 flex gap-3 justify-end">
            <button
              (click)="closeModal()"
              class="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-white transition-all"
            >
              Cancel
            </button>
            <button
              (click)="saveSolution()"
              class="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminSolutionsComponent implements OnInit {
  solutions: Solution[] = [];
  isModalOpen = false;
  currentSol: Partial<Solution> = {};
  SolutionCategory = SolutionCategory; // Expose enum to template

  technologyStackText = '';

  constructor(private solutionService: SolutionService) {}

  ngOnInit() {
    this.loadSolutions();
  }

  loadSolutions() {
    this.solutionService.getSolutions().subscribe((data) => (this.solutions = data));
  }

  openModal(sol: Solution | null = null) {
    this.currentSol = sol
      ? { ...sol }
      : {
          name: '',
          summary: '',
          description: '',
          category: SolutionCategory.Industrial,
          technologyStack: [],
          imageUrl: '',
        };
    this.syncTextFields();
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveSolution() {
    const payload = this.buildPayload();
    if (this.currentSol.id) {
      this.solutionService.updateSolution(this.currentSol.id, payload).subscribe(() => {
        this.loadSolutions();
        this.closeModal();
      });
    } else {
      this.solutionService.createSolution(payload).subscribe(() => {
        this.loadSolutions();
        this.closeModal();
      });
    }
  }

  deleteSolution(id: string) {
    if (confirm('Are you sure you want to delete this solution?')) {
      this.solutionService.deleteSolution(id).subscribe(() => this.loadSolutions());
    }
  }

  private syncTextFields() {
    this.technologyStackText = (this.currentSol.technologyStack ?? []).join(', ');
  }

  private buildPayload(): Partial<Solution> {
    return {
      ...this.currentSol,
      category: Number(this.currentSol.category), // Ensure category is a number
      technologyStack: this.parseList(this.technologyStackText),
    };
  }

  private parseList(value: string): string[] {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
}
