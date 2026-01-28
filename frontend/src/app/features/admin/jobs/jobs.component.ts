import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Job } from '../../../core/models/entities';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Job Board Management</h2>
          <p class="text-gray-500 text-sm">Post new opportunities or manage existing listings</p>
        </div>
        <button (click)="openModal()" class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined">add</span>
          Post New Job
        </button>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 text-gray-400 text-xs font-bold uppercase">
            <tr>
              <th class="px-6 py-4">Position</th>
              <th class="px-6 py-4">Location</th>
              <th class="px-6 py-4">Type</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 text-sm">
            <tr *ngFor="let job of jobs" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-4 font-bold text-gray-800">{{job.title}}</td>
              <td class="px-6 py-4 text-gray-500">{{job.location}}</td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 rounded-full bg-blue-50 text-primary text-xs font-medium">{{job.type}}</span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <button (click)="openModal(job)" class="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-md transition-all">
                    <span class="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button (click)="deleteJob(job.id)" class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all">
                    <span class="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Job Modal -->
      <div *ngIf="isModalOpen" class="fixed inset-0 bg-navy-blue/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 class="text-xl font-bold text-gray-800">{{ currentJob.id ? 'Edit' : 'Post' }} Job</h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Job Title</label>
                <input [(ngModel)]="currentJob.title" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="e.g. Solution Architect">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Location</label>
                <input [(ngModel)]="currentJob.location" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="e.g. Dhaka">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Type</label>
                <select [(ngModel)]="currentJob.type" (change)="updateIcon()" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none appearance-none">
                  <option value="Full-time">Full-time</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Category</label>
                <input [(ngModel)]="currentJob.category" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Engineering, Sales...">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Team</label>
                <input [(ngModel)]="currentJob.team" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="e.g. Infrastructure">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Salary Range</label>
              <input [(ngModel)]="currentJob.salary" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Competitive / Negotiable">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Description</label>
              <textarea [(ngModel)]="currentJob.description" rows="3" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Job summary..."></textarea>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Responsibilities (Comma separated)</label>
              <textarea [ngModel]="responsibilitiesStr" (ngModelChange)="responsibilitiesStr = $event" rows="2" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Task 1, Task 2..."></textarea>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Requirements (Comma separated)</label>
              <textarea [ngModel]="requirementsStr" (ngModelChange)="requirementsStr = $event" rows="2" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Skill 1, Skill 2..."></textarea>
            </div>
          </div>
          <div class="p-6 bg-gray-50 flex gap-3 justify-end">
            <button (click)="closeModal()" class="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-white transition-all">Cancel</button>
            <button (click)="saveJob()" class="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all">Save Posting</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
  `]
})
export class AdminJobsComponent implements OnInit {
  jobs: Job[] = [];
  isModalOpen = false;
  currentJob: Partial<Job> = {};
  responsibilitiesStr = '';
  requirementsStr = '';
  private readonly mockStorageKey = 'exoosis_mock_jobs';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    if (environment.useMockData) {
      this.jobs = this.loadMockJobs();
      return;
    }

    this.api.get<unknown>('/jobs').subscribe({
      next: (data) => {
        this.jobs = this.normalizeJobs(data);
      },
      error: () => {
        this.jobs = this.loadMockJobs();
      }
    });
  }

  openModal(job: Job | null = null) {
    this.currentJob = job ? { ...job } : { type: 'Full-time', location: 'Dhaka', typeIcon: 'schedule', category: 'Engineering' };
    this.responsibilitiesStr = this.currentJob.responsibilities?.join(', ') || '';
    this.requirementsStr = this.currentJob.requirements?.join(', ') || '';
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updateIcon() {
    const icons: any = { 'Full-time': 'schedule', 'Hybrid': 'work_history', 'Remote': 'laptop_mac', 'Contract': 'history' };
    this.currentJob.typeIcon = icons[this.currentJob.type || 'Full-time'];
  }

  saveJob() {
    this.updateIcon();
    this.currentJob.responsibilities = this.responsibilitiesStr.split(',').map(s => s.trim()).filter(s => !!s);
    this.currentJob.requirements = this.requirementsStr.split(',').map(s => s.trim()).filter(s => !!s);
    
    if (!this.currentJob.datePosted) {
      const parts = new Date().toDateString().split(' ');
      this.currentJob.datePosted = `${parts[1]} ${parts[2]}, ${parts[3]}`;
    }

    if (environment.useMockData) {
      const jobs = this.loadMockJobs();
      if (this.currentJob.id) {
        const updated = jobs.map(job => job.id === this.currentJob.id ? this.currentJob as Job : job);
        this.saveMockJobs(updated);
      } else {
        const nextId = jobs.length ? Math.max(...jobs.map(job => job.id)) + 1 : 1;
        const created = { ...this.currentJob, id: nextId } as Job;
        this.saveMockJobs([created, ...jobs]);
      }
      this.loadJobs();
      this.closeModal();
      return;
    }

    if (this.currentJob.id) {
      this.api.put<Job>(`/jobs/${this.currentJob.id}`, this.currentJob).subscribe(() => {
        this.loadJobs();
        this.closeModal();
      });
    } else {
      this.api.post<Job>('/jobs', this.currentJob).subscribe(() => {
        this.loadJobs();
        this.closeModal();
      });
    }
  }

  deleteJob(id: number) {
    if (confirm('Are you sure you want to delete this job posting?')) {
      if (environment.useMockData) {
        const jobs = this.loadMockJobs().filter(job => job.id !== id);
        this.saveMockJobs(jobs);
        this.loadJobs();
        return;
      }

      this.api.delete(`/jobs/${id}`).subscribe(() => this.loadJobs());
    }
  }

  private loadMockJobs(): Job[] {
    const stored = localStorage.getItem(this.mockStorageKey);
    if (!stored) {
      const seeded: Job[] = [
        {
          id: 1,
          title: 'Senior Solutions Architect',
          location: 'Dhaka',
          type: 'Full-time',
          typeIcon: 'schedule',
          category: 'Engineering',
          description: 'Lead enterprise solution design for flagship clients.',
          responsibilities: ['Client discovery', 'Technical workshops', 'Solution design'],
          requirements: ['5+ years experience', 'Cloud architecture', 'Stakeholder management'],
          team: 'Delivery',
          salary: 'Competitive',
          datePosted: 'Aug 15, 2024'
        },
        {
          id: 2,
          title: 'Customer Success Manager',
          location: 'Remote',
          type: 'Hybrid',
          typeIcon: 'work_history',
          category: 'Customer Success',
          description: 'Own enterprise onboarding journeys and adoption plans.',
          responsibilities: ['Onboarding', 'Renewals', 'Quarterly reviews'],
          requirements: ['SaaS experience', 'Account management', 'Strong communication'],
          team: 'Customer Success',
          salary: 'Negotiable',
          datePosted: 'Aug 10, 2024'
        }
      ];
      localStorage.setItem(this.mockStorageKey, JSON.stringify(seeded));
      return seeded;
    }

    try {
      return JSON.parse(stored) as Job[];
    } catch {
      return [];
    }
  }

  private normalizeJobs(data: unknown): Job[] {
    if (Array.isArray(data)) {
      return data as Job[];
    }

    if (data && typeof data === 'object') {
      const record = data as { jobs?: Job[]; data?: Job[]; items?: Job[] };
      const jobs = record.jobs ?? record.data ?? record.items;
      if (Array.isArray(jobs)) {
        return jobs;
      }
    }

    return [];
  }

  private saveMockJobs(jobs: Job[]) {
    localStorage.setItem(this.mockStorageKey, JSON.stringify(jobs));
  }
}
