import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RespectedClient } from '../../../core/models/entities';

@Component({
  selector: 'app-home-respected-clients-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './respected-clients-section.component.html',
})
export class RespectedClientsSectionComponent {
  @Input() clients: RespectedClient[] = [];
}
