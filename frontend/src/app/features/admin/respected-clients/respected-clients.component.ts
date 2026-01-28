import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RespectedClientService } from '../../../core/services/respected-client.service';
import { RespectedClient } from '../../../core/models/entities';

@Component({
  selector: 'app-admin-respected-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Respected Clients</h2>
          <p class="text-gray-500 text-sm">Manage the client logos shown on the homepage</p>
        </div>
        <button (click)="openModal()" class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined">group</span>
          Add Client
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div *ngFor="let client of clients" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow relative">
          <div class="size-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
            <img *ngIf="client.logoUrl" [src]="client.logoUrl" [alt]="client.name" class="h-10 w-auto object-contain" />
            <span *ngIf="!client.logoUrl" class="text-[10px] font-semibold text-gray-400">No logo</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-gray-800 truncate">{{client.name}}</h3>
              <span *ngIf="!client.isActive" class="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[10px] font-bold uppercase">Inactive</span>
            </div>
            <div class="flex gap-2">
              <button (click)="openModal(client)" class="text-xs font-bold text-primary hover:underline">Edit</button>
              <button (click)="deleteClient(client.id)" class="text-xs font-bold text-red-500 hover:underline">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="isModalOpen" class="fixed inset-0 bg-navy-blue/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 class="text-xl font-bold text-gray-800">{{ currentClient.id ? 'Edit' : 'Add' }} Client</h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Client Name</label>
              <input [(ngModel)]="currentClient.name" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="Client name">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Logo URL</label>
              <input [(ngModel)]="currentClient.logoUrl" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none" placeholder="https://">
            </div>
            <div class="flex items-center gap-3">
              <input type="checkbox" [(ngModel)]="currentClient.isActive" id="clientActive" class="size-4 rounded border-gray-300 text-primary focus:ring-primary">
              <label for="clientActive" class="text-sm font-bold text-gray-700">Active Client</label>
            </div>
          </div>
          <div class="p-6 bg-gray-50 flex gap-3 justify-end">
            <button (click)="closeModal()" class="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-white transition-all">Cancel</button>
            <button (click)="saveClient()" class="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-primary/20 transition-all">Save Client</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminRespectedClientsComponent implements OnInit {
  clients: RespectedClient[] = [];
  isModalOpen = false;
  currentClient: Partial<RespectedClient> = {};

  constructor(private respectedClientService: RespectedClientService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.respectedClientService.getClients({ includeInactive: true }).subscribe((data) => {
      this.clients = data;
    });
  }

  openModal(client: RespectedClient | null = null) {
    this.currentClient = client ? { ...client } : { isActive: true };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveClient() {
    if (this.currentClient.id) {
      this.respectedClientService
        .updateClient(this.currentClient.id, {
          name: this.currentClient.name ?? '',
          logoUrl: this.currentClient.logoUrl,
          isActive: this.currentClient.isActive,
        })
        .subscribe(() => {
          this.loadClients();
          this.closeModal();
        });
    } else {
      this.respectedClientService
        .createClient({
          name: this.currentClient.name ?? '',
          logoUrl: this.currentClient.logoUrl,
          isActive: this.currentClient.isActive,
        })
        .subscribe(() => {
          this.loadClients();
          this.closeModal();
        });
    }
  }

  deleteClient(id: string) {
    if (confirm('Are you sure you want to remove this client?')) {
      this.respectedClientService.deleteClient(id).subscribe(() => this.loadClients());
    }
  }
}
