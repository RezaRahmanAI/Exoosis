import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { TeamMember } from '../../../core/models/entities';

@Component({
  selector: 'app-admin-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Team Directory</h2>
          <p class="text-gray-500 text-sm">Manage leadership and staff profiles</p>
        </div>
        <button (click)="openModal()" class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined">person_add</span>
          Add Member
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div *ngFor="let member of team" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow relative">
          <img [src]="member.image" class="size-16 rounded-xl object-cover bg-gray-100 border border-gray-100">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-gray-800 truncate">{{member.name}}</h3>
              <span *ngIf="member.isLeadership" class="px-1.5 py-0.5 rounded-md bg-blue-50 text-primary text-[10px] font-bold uppercase">Lead</span>
            </div>
            <p class="text-sm text-gray-500 mb-2 truncate">{{member.role}}</p>
            <div class="flex gap-2">
              <button (click)="openModal(member)" class="text-xs font-bold text-primary hover:underline">Edit</button>
              <button (click)="deleteMember(member.id)" class="text-xs font-bold text-red-500 hover:underline">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Member Modal -->
      <div *ngIf="isModalOpen" class="fixed inset-0 bg-navy-blue/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 class="text-xl font-bold text-gray-800">{{ currentMember.id ? 'Edit' : 'Add' }} Member</h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Name</label>
                <input [(ngModel)]="currentMember.name" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Full Name">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Role</label>
                <input [(ngModel)]="currentMember.role" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="e.g. CEO">
              </div>
              <div class="flex items-center gap-3 pt-6">
                <input type="checkbox" [(ngModel)]="currentMember.isLeadership" id="isLead" class="size-4 rounded border-gray-300 text-primary focus:ring-primary">
                <label for="isLead" class="text-sm font-bold text-gray-700">Leadership Team</label>
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Bio</label>
              <textarea [(ngModel)]="currentMember.bio" rows="3" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Short biography..."></textarea>
            </div>
          </div>
          <div class="p-6 bg-gray-50 flex gap-3 justify-end">
            <button (click)="closeModal()" class="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-white transition-all">Cancel</button>
            <button (click)="saveMember()" class="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all">Save Profile</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminTeamComponent implements OnInit {
  team: TeamMember[] = [];
  isModalOpen = false;
  currentMember: Partial<TeamMember> = {};

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadTeam();
  }

  loadTeam() {
    this.api.get<TeamMember[]>('/team').subscribe(data => this.team = data);
  }

  openModal(member: TeamMember | null = null) {
    this.currentMember = member ? { ...member } : { isLeadership: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM2x5D94owixu9qVXa8RY7tb7VRjn0yHzJw3O27nwTAuKSg3aMpOma89mMh8wtdH4h8j9qImMUNtrzSdgz8z9Rp7-Mlcag5cwTuOOU_mNjLCT9nF7Dntxpv25u9K7o5uiXuvn-wAAtJJB_mjfFiW-Sd7OG4GocJjd77y3eEy4QeDh2yDFDfjACBoYdlOV25n1kJbSHai2nHE1aKI1cquQ83HvqhfqqJk1nfDtRGaXmHi2NVpSfHMvitIbFEAFdX_RTOWJHK2Tz2w-9' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveMember() {
    if (this.currentMember.id) {
      this.api.put<TeamMember>(`/team/${this.currentMember.id}`, this.currentMember).subscribe(() => {
        this.loadTeam();
        this.closeModal();
      });
    } else {
      this.api.post<TeamMember>('/team', this.currentMember).subscribe(() => {
        this.loadTeam();
        this.closeModal();
      });
    }
  }

  deleteMember(id: number) {
    if (confirm('Are you sure you want to remove this team member?')) {
      this.api.delete(`/team/${id}`).subscribe(() => this.loadTeam());
    }
  }
}
