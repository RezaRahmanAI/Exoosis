import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Insight } from '../../../core/models/entities';

@Component({
  selector: 'app-home-insights-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insights-section.component.html'
})
export class InsightsSectionComponent {
  @Input() insights: Insight[] = [];
}
