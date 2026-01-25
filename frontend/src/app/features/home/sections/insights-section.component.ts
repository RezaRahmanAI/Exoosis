import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Insight {
  category: string;
  title: string;
  desc: string;
  image: string;
  author: string;
  role: string;
  date: string;
}

@Component({
  selector: 'app-home-insights-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insights-section.component.html'
})
export class InsightsSectionComponent {
  @Input() insights: Insight[] = [];
}
