import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Testimonial } from '../../../core/models/entities';

@Component({
  selector: 'app-admin-testimonials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Testimonials</h2>
          <p class="text-gray-500 text-sm">Curate client feedback for the homepage showcase</p>
        </div>
        <button (click)="openModal()" class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined">add_comment</span>
          Add Testimonial
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div *ngFor="let testimonial of testimonials" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
          <div class="flex items-start gap-4">
            <img [src]="testimonial.image" class="size-14 rounded-xl object-cover border border-gray-100 bg-gray-50">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-gray-900 truncate">{{testimonial.author}}</p>
              <p class="text-xs text-gray-500 truncate">
                {{testimonial.role}}<span *ngIf="testimonial.company"> | {{testimonial.company}}</span>
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button (click)="openModal(testimonial)" class="text-xs font-bold text-primary hover:underline">Edit</button>
              <button (click)="deleteTestimonial(testimonial.id)" class="text-xs font-bold text-red-500 hover:underline">Remove</button>
            </div>
          </div>
          <p class="text-sm text-gray-600 leading-relaxed line-clamp-4">“{{testimonial.quote}}”</p>
        </div>
      </div>

      <div *ngIf="isModalOpen" class="fixed inset-0 bg-navy-blue/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 class="text-xl font-bold text-gray-800">{{ currentTestimonial.id ? 'Edit' : 'Add' }} Testimonial</h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Author</label>
                <input [(ngModel)]="currentTestimonial.author" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Client name">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Role</label>
                <input [(ngModel)]="currentTestimonial.role" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="e.g. CTO">
              </div>
              <div class="md:col-span-2">
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Company</label>
                <input [(ngModel)]="currentTestimonial.company" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Company or organization">
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Quote</label>
              <textarea [(ngModel)]="currentTestimonial.quote" rows="4" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Client feedback..."></textarea>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Photo URL</label>
              <input [(ngModel)]="currentTestimonial.image" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="https://...">
            </div>
          </div>
          <div class="p-6 bg-gray-50 flex gap-3 justify-end">
            <button (click)="closeModal()" class="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-white transition-all">Cancel</button>
            <button (click)="saveTestimonial()" class="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all">Save Testimonial</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminTestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [];
  isModalOpen = false;
  currentTestimonial: Partial<Testimonial> = {};

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadTestimonials();
  }

  loadTestimonials() {
    this.api.get<Testimonial[]>('/testimonials').subscribe(data => this.testimonials = data);
  }

  openModal(testimonial: Testimonial | null = null) {
    this.currentTestimonial = testimonial ? { ...testimonial } : {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvOFJbtXss0-oOURmaN1XCNQ5v3AnbTlbAzq45HxpDt2bLlHmFJvFRP08mC7jebApLqIa5LeuXEprsCCfgmTIQQT5mV7m3k8zT-FSSo8Wf7R2b98lk3irtXZdM5xVN2HLaH7Rx68cFE5wenKrf2VtrPoCgJfT-wKs8v2ApTlSjzuPhsGLuw7pP395_VBJkS7CoW5sWG7VQRQ8XGugo5Mdj2Ul1bc0oVahkLkIYG8tnEKOIfYlQq3uI7_ftO1P_FRCWxpq5gJ85M7hP'
    };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveTestimonial() {
    if (this.currentTestimonial.id) {
      this.api.put<Testimonial>(`/testimonials/${this.currentTestimonial.id}`, this.currentTestimonial).subscribe(() => {
        this.loadTestimonials();
        this.closeModal();
      });
    } else {
      this.api.post<Testimonial>('/testimonials', this.currentTestimonial).subscribe(() => {
        this.loadTestimonials();
        this.closeModal();
      });
    }
  }

  deleteTestimonial(id: number) {
    if (confirm('Are you sure you want to remove this testimonial?')) {
      this.api.delete(`/testimonials/${id}`).subscribe(() => this.loadTestimonials());
    }
  }
}
