import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-navy-blue text-white flex-shrink-0">
        <div class="p-6">
          <h2 class="text-xl font-bold tracking-tight">EXOSIS ADMIN</h2>
        </div>
        <nav class="mt-4 px-4 space-y-2">
          <a
            routerLink="/dashboard"
            routerLinkActive="bg-primary/20 border-l-4 border-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span class="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a
            routerLink="/dashboard/hero"
            routerLinkActive="bg-primary/20 border-l-4 border-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span class="material-symbols-outlined">image</span>
            <span>Hero Banner</span>
          </a>
          <a
            routerLink="/dashboard/solutions"
            routerLinkActive="bg-primary/20 border-l-4 border-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span class="material-symbols-outlined">lightbulb</span>
            <span>Solutions</span>
          </a>
          <a
            routerLink="/dashboard/brands"
            routerLinkActive="bg-primary/20 border-l-4 border-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span class="material-symbols-outlined">handshake</span>
            <span>Brands</span>
          </a>
          <a
            routerLink="/dashboard/categories"
            routerLinkActive="bg-primary/20 border-l-4 border-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span class="material-symbols-outlined">category</span>
            <span>Categories</span>
          </a>
          <a
            routerLink="/dashboard/products"
            routerLinkActive="bg-primary/20 border-l-4 border-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span class="material-symbols-outlined">inventory_2</span>
            <span>Products</span>
          </a>
          <a
            routerLink="/dashboard/orders"
            routerLinkActive="bg-primary/20 border-l-4 border-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span class="material-symbols-outlined">shopping_cart</span>
            <span>Orders</span>
          </a>
          <a
            routerLink="/dashboard/jobs"
            routerLinkActive="bg-primary/20 border-l-4 border-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span class="material-symbols-outlined">work</span>
            <span>Jobs</span>
          </a>
          <a
            routerLink="/dashboard/team"
            routerLinkActive="bg-primary/20 border-l-4 border-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span class="material-symbols-outlined">groups</span>
            <span>Team</span>
          </a>
          <a
            routerLink="/dashboard/testimonials"
            routerLinkActive="bg-primary/20 border-l-4 border-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span class="material-symbols-outlined">reviews</span>
            <span>Testimonials</span>
          </a>
          <a
            routerLink="/dashboard/respected-clients"
            routerLinkActive="bg-primary/20 border-l-4 border-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span class="material-symbols-outlined">verified_user</span>
            <span>Respected Clients</span>
          </a>
          <a
            routerLink="/dashboard/settings"
            routerLinkActive="bg-primary/20 border-l-4 border-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span class="material-symbols-outlined">settings</span>
            <span>Website Settings</span>
          </a>
          <a
            routerLink="/dashboard/change-password"
            routerLinkActive="bg-primary/20 border-l-4 border-primary"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span class="material-symbols-outlined">password</span>
            <span>Change Password</span>
          </a>
          <div class="pt-8 mt-8 border-t border-white/10">
            <a
              routerLink="/"
              class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors opacity-70"
            >
              <span class="material-symbols-outlined">home</span>
              <span>Back to Site</span>
            </a>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-auto">
        <header class="bg-white shadow-sm h-16 flex items-center px-8 sticky top-0 z-10">
          <h1 class="text-lg font-bold text-gray-800">Control Center</h1>
          <div class="ml-auto flex items-center gap-4">
            <span class="text-sm font-medium text-gray-500">Administrator</span>
            <div
              class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold"
            >
              A
            </div>
          </div>
        </header>
        <div class="p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
      }
    `,
  ],
})
export class AdminLayoutComponent {}
