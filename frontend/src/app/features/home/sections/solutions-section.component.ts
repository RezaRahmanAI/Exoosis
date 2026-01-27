import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Solution, SolutionCategory } from '../../../core/models/entities';

@Component({
  selector: 'app-home-solutions-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './solutions-section.component.html',
})
export class SolutionsSectionComponent {
  @Input() solutions: Solution[] = [];
  selectedCategory: SolutionCategory = SolutionCategory.Industrial;
  SolutionCategory = SolutionCategory; // Expose enum to template

  get filteredSolutions() {
    return this.solutions.filter((solution) => solution.category === this.selectedCategory);
  }

  selectCategory(category: SolutionCategory) {
    this.selectedCategory = category;
  }
}
