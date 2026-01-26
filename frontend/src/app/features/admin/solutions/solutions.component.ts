import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolutionService } from '../../../core/services/solution.service';
import { Solution, SolutionMetric, SolutionSupport } from '../../../core/models/entities';

@Component({
  selector: 'app-admin-solutions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Manage Solutions</h2>
          <p class="text-gray-500 text-sm">Add, edit or remove products and industry solutions</p>
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
              <th class="px-6 py-4">Industries</th>
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
                    <p class="font-bold text-gray-800 line-clamp-1">{{sol.name}}</p>
                    <p class="text-xs text-gray-400 max-w-xs truncate">{{sol.summary}}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">{{sol.category}}</span>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span *ngFor="let industry of sol.industries" class="px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500 text-[10px]">{{industry}}</span>
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

      <!-- Edit/Add Modal -->
      <div *ngIf="isModalOpen" class="fixed inset-0 bg-navy-blue/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-fade-in-up">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 class="text-xl font-bold text-gray-800">{{ currentSol.id ? 'Edit' : 'Add' }} Solution</h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Name</label>
              <input [(ngModel)]="currentSol.name" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none" placeholder="e.g. Industrial Automation Suite">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Summary</label>
              <input [(ngModel)]="currentSol.summary" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none" placeholder="Short overview...">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Description</label>
              <textarea [(ngModel)]="currentSol.description" rows="3" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none" placeholder="Enter solution details..."></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Category</label>
                <input [(ngModel)]="currentSol.category" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none" placeholder="Industrial, Corporate, Banking...">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Icon</label>
                <input [(ngModel)]="currentSol.icon" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none" placeholder="e.g. precision_manufacturing">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Image URL</label>
              <input [(ngModel)]="currentSol.imageUrl" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none" placeholder="https://">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Industries (comma separated)</label>
                <input [(ngModel)]="industriesText" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Manufacturing, Logistics">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Brands (comma separated)</label>
                <input [(ngModel)]="brandsText" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Cisco, Dell">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Capabilities (comma separated)</label>
              <input [(ngModel)]="capabilitiesText" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Automation, Analytics">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Integrations (comma separated)</label>
                <input [(ngModel)]="integrationsText" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="ERP, CRM">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Compliance (comma separated)</label>
                <input [(ngModel)]="complianceText" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="ISO 27001, GDPR">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Deployment (comma separated)</label>
              <input [(ngModel)]="deploymentText" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Cloud, On-premises">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Metrics (one per line, label:value)</label>
                <textarea [(ngModel)]="metricsText" rows="3" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Uptime:99.9%"></textarea>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Support (one per line, label:detail)</label>
                <textarea [(ngModel)]="supportText" rows="3" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Implementation:90-day onboarding"></textarea>
              </div>
            </div>
            <div class="flex flex-wrap gap-6">
              <label class="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                <input type="checkbox" [(ngModel)]="currentSol.isFeatured" class="size-4 rounded border-gray-300 text-primary focus:ring-primary">
                Featured on homepage
              </label>
              <label class="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                <input type="checkbox" [(ngModel)]="currentSol.isActive" class="size-4 rounded border-gray-300 text-primary focus:ring-primary">
                Active
              </label>
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

  brandsText = '';
  capabilitiesText = '';
  industriesText = '';
  integrationsText = '';
  complianceText = '';
  deploymentText = '';
  metricsText = '';
  supportText = '';

  constructor(private solutionService: SolutionService) {}

  ngOnInit() {
    this.loadSolutions();
  }

  loadSolutions() {
    this.solutionService.getSolutions().subscribe(data => this.solutions = data);
  }

  openModal(sol: Solution | null = null) {
    this.currentSol = sol ? { ...sol } : {
      name: '',
      summary: '',
      description: '',
      category: 'Industrial',
      icon: 'grid_view',
      brands: [],
      capabilities: [],
      industries: [],
      integrations: [],
      compliance: [],
      deployment: [],
      metrics: [],
      support: [],
      imageUrl: '',
      isFeatured: false,
      isActive: true
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
    this.brandsText = (this.currentSol.brands ?? []).join(', ');
    this.capabilitiesText = (this.currentSol.capabilities ?? []).join(', ');
    this.industriesText = (this.currentSol.industries ?? []).join(', ');
    this.integrationsText = (this.currentSol.integrations ?? []).join(', ');
    this.complianceText = (this.currentSol.compliance ?? []).join(', ');
    this.deploymentText = (this.currentSol.deployment ?? []).join(', ');
    this.metricsText = (this.currentSol.metrics ?? [])
      .map(metric => `${metric.label}:${metric.value}`)
      .join('\n');
    this.supportText = (this.currentSol.support ?? [])
      .map(item => `${item.label}:${item.detail}`)
      .join('\n');
  }

  private buildPayload(): Partial<Solution> {
    return {
      ...this.currentSol,
      brands: this.parseList(this.brandsText),
      capabilities: this.parseList(this.capabilitiesText),
      industries: this.parseList(this.industriesText),
      integrations: this.parseList(this.integrationsText),
      compliance: this.parseList(this.complianceText),
      deployment: this.parseList(this.deploymentText),
      metrics: this.parsePairs(this.metricsText, (label, value) => ({ label, value })),
      support: this.parsePairs(this.supportText, (label, detail) => ({ label, detail }))
    };
  }

  private parseList(value: string): string[] {
    return value
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
  }

  private parsePairs<T>(value: string, factory: (label: string, detail: string) => T): T[] {
    return value
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const [label, ...rest] = line.split(':');
        const detail = rest.join(':').trim();
        return factory(label.trim(), detail || '');
      })
      .filter(item => {
        if ('label' in (item as SolutionMetric | SolutionSupport)) {
          return Boolean((item as SolutionMetric | SolutionSupport).label);
        }
        return true;
      });
  }
}
