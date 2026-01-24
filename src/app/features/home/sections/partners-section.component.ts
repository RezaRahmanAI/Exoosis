import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Partner } from '../../../core/models/entities';

@Component({
  selector: 'app-home-partners-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partners-section.component.html'
})
export class PartnersSectionComponent {
  @Input() logos: Partner[] = [];
}
