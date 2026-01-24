import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-32 flex flex-col justify-between">
        <span class="text-sm font-medium text-gray-500">Total Solutions</span>
        <div class="flex items-end justify-between">
          <span class="text-3xl font-bold text-gray-800">12</span>
          <span class="text-green-500 text-xs font-bold">+2 this month</span>
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-32 flex flex-col justify-between">
        <span class="text-sm font-medium text-gray-500">Active Job Postings</span>
        <div class="flex items-end justify-between">
          <span class="text-3xl font-bold text-gray-800">4</span>
          <span class="text-blue-500 text-xs font-bold">2 closing soon</span>
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-32 flex flex-col justify-between">
        <span class="text-sm font-medium text-gray-500">Team Members</span>
        <div class="flex items-end justify-between">
          <span class="text-3xl font-bold text-gray-800">28</span>
          <span class="text-gray-400 text-xs">Excluding contractors</span>
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-32 flex flex-col justify-between">
        <span class="text-sm font-medium text-gray-500">System Status</span>
        <div class="flex items-end justify-between">
          <span class="text-3xl font-bold text-green-500 italic">Online</span>
          <span class="text-gray-400 text-xs">All systems nominal</span>
        </div>
      </div>
    </div>

    <div class="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-50">
        <h3 class="font-bold text-gray-800">Recent Activity</h3>
      </div>
      <div class="p-6">
        <div class="space-y-6">
          <div class="flex gap-4 items-start">
            <div class="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
            <div>
              <p class="text-sm text-gray-800 font-medium">New job posted: "Senior Network Engineer"</p>
              <p class="text-xs text-gray-400 mt-1">2 hours ago by Admin</p>
            </div>
          </div>
          <div class="flex gap-4 items-start">
            <div class="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
            <div>
              <p class="text-sm text-gray-800 font-medium">Solution updated: "IoT Factory Automation"</p>
              <p class="text-xs text-gray-400 mt-1">Yesterday by Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}
