import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { OrderPayload } from '../../core/models/entities';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './my-orders.component.html'
})
export class MyOrdersComponent implements OnInit {
  orders: OrderPayload[] = [];
  isLoading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.isLoading = false;
    });
  }

  formatOrderId(id: number) {
    return `ORD-${id.toString().padStart(4, '0')}`;
  }
}
