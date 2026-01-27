import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolutionService } from '../../core/services/solution.service';
import { Solution } from '../../core/models/entities';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.css',
})
export class SolutionsComponent implements OnInit {
  softwareCatalog: Solution[] = [];
  searchTerm = '';
  selectedCategory: 'All' | string = 'All';

  constructor(private solutionService: SolutionService) {}

  ngOnInit() {
    this.solutionService.getSolutions().subscribe((data) => {
      this.softwareCatalog = data;
    });
  }

  get categories() {
    const unique = Array.from(new Set(this.softwareCatalog.map((item) => item.category)));
    return ['All', ...unique] as Array<'All' | string>;
  }

  get filteredSoftware() {
    return this.softwareCatalog.filter((item) => {
      const matchesCategory =
        this.selectedCategory === 'All' || item.category === this.selectedCategory;
      const name = item.name ?? '';
      const summary = item.summary ?? '';
      const matchesSearch =
        !this.searchTerm ||
        name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        summary.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
}
