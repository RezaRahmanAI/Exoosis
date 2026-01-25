import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OfficeSolution {
  title: string;
  icon: string;
  desc: string;
}

@Component({
  selector: 'app-home-office-solutions-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './office-solutions-section.component.html'
})
export class OfficeSolutionsSectionComponent {
  @Input() officeSolutions: OfficeSolution[] = [];
}
