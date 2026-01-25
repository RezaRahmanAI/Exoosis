import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PeripheralCategory {
  icon: string;
  name: string;
  desc: string;
}

@Component({
  selector: 'app-home-peripherals-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peripherals-section.component.html'
})
export class PeripheralsSectionComponent {
  @Input() categories: PeripheralCategory[] = [];
}
