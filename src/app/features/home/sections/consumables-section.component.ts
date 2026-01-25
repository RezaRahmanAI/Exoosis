import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumableItem } from '../../../core/models/entities';

@Component({
  selector: 'app-home-consumables-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consumables-section.component.html'
})
export class ConsumablesSectionComponent {
  @Input() consumables: ConsumableItem[] = [];
}
