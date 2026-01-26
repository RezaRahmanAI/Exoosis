import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html'
})
export class MyOrdersComponent {
  orders = [
    { id: 'ORD-1001', status: 'Processing', total: 1299, placedAt: '2024-06-15' },
    { id: 'ORD-1002', status: 'Delivered', total: 799, placedAt: '2024-05-22' }
  ];
}
