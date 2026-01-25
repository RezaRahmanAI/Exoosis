import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ConsumableItem {
  name: string;
  image: string;
}

@Component({
  selector: 'app-home-consumables-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consumables-section.component.html'
})
export class ConsumablesSectionComponent {
  @Input() consumables: ConsumableItem[] = [];
}
