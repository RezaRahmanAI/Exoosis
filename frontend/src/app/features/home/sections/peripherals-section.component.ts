import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface PeripheralCategory {
  name: string;
  description?: string | null;
  imageUrl?: string | null;
}

@Component({
  selector: 'app-home-peripherals-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './peripherals-section.component.html',
})
export class PeripheralsSectionComponent {
  @Input() categories: PeripheralCategory[] = [];
}
