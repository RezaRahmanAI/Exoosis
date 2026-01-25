import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-8">
      <header class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p class="text-sm font-semibold text-slate-400 uppercase tracking-[0.3em]">Admin overview</p>
          <h1 class="text-2xl md:text-3xl font-bold text-slate-900">Operations dashboard</h1>
          <p class="text-sm text-slate-500 mt-2">Track catalog performance, partner activity, and service health in one place.</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary transition">Export report</button>
          <button class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20">Create update</button>
        </div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-slate-500">Total Solutions</span>
            <span class="material-symbols-outlined text-primary">hub</span>
          </div>
          <div class="mt-4 flex items-end justify-between">
            <span class="text-3xl font-bold text-slate-900">12</span>
            <span class="text-xs font-semibold text-green-500">+2 this month</span>
          </div>
          <div class="mt-4 h-2 rounded-full bg-slate-100">
            <div class="h-2 rounded-full bg-primary" style="width: 72%"></div>
          </div>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-slate-500">Active Job Postings</span>
            <span class="material-symbols-outlined text-primary">assignment</span>
          </div>
          <div class="mt-4 flex items-end justify-between">
            <span class="text-3xl font-bold text-slate-900">4</span>
            <span class="text-xs font-semibold text-blue-500">2 closing soon</span>
          </div>
          <div class="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span class="material-symbols-outlined text-base">schedule</span>
            Average time to hire: 18 days
          </div>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-slate-500">Team Members</span>
            <span class="material-symbols-outlined text-primary">groups</span>
          </div>
          <div class="mt-4 flex items-end justify-between">
            <span class="text-3xl font-bold text-slate-900">28</span>
            <span class="text-xs font-semibold text-slate-400">+3 onboarding</span>
          </div>
          <div class="mt-4 flex -space-x-3">
            <div class="h-8 w-8 rounded-full bg-slate-200 border-2 border-white"></div>
            <div class="h-8 w-8 rounded-full bg-slate-300 border-2 border-white"></div>
            <div class="h-8 w-8 rounded-full bg-slate-400 border-2 border-white"></div>
            <div class="h-8 w-8 rounded-full bg-slate-500 border-2 border-white"></div>
          </div>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-slate-500">System Status</span>
            <span class="material-symbols-outlined text-green-500">shield</span>
          </div>
          <div class="mt-4 flex items-end justify-between">
            <span class="text-3xl font-bold text-green-500">Online</span>
            <span class="text-xs font-semibold text-slate-400">All systems nominal</span>
          </div>
          <div class="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span class="material-symbols-outlined text-base">sync</span>
            Last sync 4 minutes ago
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div class="xl:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="p-6 border-b border-slate-100">
            <h3 class="font-bold text-slate-900">Recent activity</h3>
            <p class="text-sm text-slate-500 mt-1">Latest updates across jobs, solutions, and releases.</p>
          </div>
          <div class="p-6 space-y-6">
            <div class="flex gap-4 items-start">
              <div class="w-9 h-9 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                <span class="material-symbols-outlined text-base">campaign</span>
              </div>
              <div>
                <p class="text-sm text-slate-900 font-semibold">New job posted: "Senior Network Engineer"</p>
                <p class="text-xs text-slate-400 mt-1">2 hours ago by Admin</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <div class="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                <span class="material-symbols-outlined text-base">rocket_launch</span>
              </div>
              <div>
                <p class="text-sm text-slate-900 font-semibold">Solution updated: "IoT Factory Automation"</p>
                <p class="text-xs text-slate-400 mt-1">Yesterday by Admin</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <div class="w-9 h-9 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                <span class="material-symbols-outlined text-base">notification_important</span>
              </div>
              <div>
                <p class="text-sm text-slate-900 font-semibold">Inventory alert: 5 SKUs below threshold</p>
                <p class="text-xs text-slate-400 mt-1">2 days ago by System</p>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="p-6 border-b border-slate-100">
            <h3 class="font-bold text-slate-900">Service health</h3>
            <p class="text-sm text-slate-500 mt-1">Live monitoring snapshots.</p>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-slate-800">Platform uptime</p>
                <p class="text-xs text-slate-400">Last 30 days</p>
              </div>
              <span class="text-sm font-bold text-slate-900">99.98%</span>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-slate-800">Response time</p>
                <p class="text-xs text-slate-400">Global average</p>
              </div>
              <span class="text-sm font-bold text-slate-900">220ms</span>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-slate-800">Open tickets</p>
                <p class="text-xs text-slate-400">Critical priority</p>
              </div>
              <span class="text-sm font-bold text-amber-500">3</span>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p class="text-xs text-slate-500 uppercase tracking-[0.2em]">Next maintenance</p>
              <p class="text-sm font-semibold text-slate-800 mt-2">Sunday, 2:00 AM - 4:00 AM GMT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}
