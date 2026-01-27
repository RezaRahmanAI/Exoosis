import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { OrderPayload } from '../models/entities';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly mockStorageKey = 'exoosis_mock_orders';

  constructor(private api: ApiService) {}

  getOrders(): Observable<OrderPayload[]> {
    if (environment.useMockData) {
      return of(this.loadMockOrders());
    }

    return this.api.get<OrderPayload[]>('/orders');
  }

  createOrder(order: Omit<OrderPayload, 'id'>): Observable<OrderPayload> {
    if (environment.useMockData) {
      const orders = this.loadMockOrders();
      const nextId = orders.length ? Math.max(...orders.map(item => item.id)) + 1 : 1;
      const created: OrderPayload = {
        id: nextId,
        status: order.status ?? 'Processing',
        ...order
      };
      const updated = [created, ...orders];
      this.saveMockOrders(updated);
      return of(created);
    }

    return this.api.post<OrderPayload>('/orders', order);
  }

  private loadMockOrders(): OrderPayload[] {
    const stored = localStorage.getItem(this.mockStorageKey);
    if (!stored) {
      return [];
    }

    try {
      return JSON.parse(stored) as OrderPayload[];
    } catch {
      return [];
    }
  }

  private saveMockOrders(orders: OrderPayload[]) {
    localStorage.setItem(this.mockStorageKey, JSON.stringify(orders));
  }
}
