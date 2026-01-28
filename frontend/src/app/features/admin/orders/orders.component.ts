import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Order {
  id: string; // Guid
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  status: string;
  orderDate: string;
  items: any[];
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Order Management</h1>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let order of orders">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.id.substring(0, 8) }}...
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ order.customerName }}</div>
                <div class="text-sm text-gray-500">{{ order.customerPhone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.orderDate | date: 'mediumDate' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ order.totalAmount | currency }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  [class.bg-green-100]="order.status === 'Delivered'"
                  [class.text-green-800]="order.status === 'Delivered'"
                  [class.bg-yellow-100]="order.status === 'Processing'"
                  [class.text-yellow-800]="order.status === 'Processing'"
                  [class.bg-blue-100]="order.status === 'Shipped'"
                  [class.text-blue-800]="order.status === 'Shipped'"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <select
                  (change)="updateStatus(order, $event)"
                  [value]="order.status"
                  class="mr-2 border rounded p-1 text-sm bg-gray-50"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
            <tr *ngIf="orders.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                No orders found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.api.get<ApiResponse<Order[]> | Order[]>('/orders').subscribe((data) => {
      const orders = Array.isArray(data) ? data : data?.data;
      this.orders = Array.isArray(orders) ? orders : [];
    });
  }

  updateStatus(order: Order, event: any) {
    const newStatus = event.target.value;
    this.api.put<any>(`/orders/${order.id}/status`, `"${newStatus}"`).subscribe({
      next: () => {
        order.status = newStatus;
        // Optional: show toast
      },
      error: (err) => {
        console.error('Failed to update status', err);
        // Optional: revert
      },
    });
  }
}
