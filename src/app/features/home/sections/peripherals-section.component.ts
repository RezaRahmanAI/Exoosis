import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeripheralCategory } from '../../../core/models/entities';

@Component({
  selector: 'app-home-peripherals-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peripherals-section.component.html'
})
export class PeripheralsSectionComponent {
  @Input() categories: PeripheralCategory[] = [];
}
