import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Solution } from '../../../core/models/entities';

@Component({
  selector: 'app-home-solutions-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './solutions-section.component.html'
})
export class SolutionsSectionComponent {
  @Input() solutions: Solution[] = [];
}
