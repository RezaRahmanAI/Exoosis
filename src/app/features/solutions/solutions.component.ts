import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { Solution } from '../../core/models/entities';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.css'
})
export class SolutionsComponent implements OnInit {
  solutions: Solution[] = [];
  searchTerm = '';
  activeCategory = 'All';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<Solution[]>('/solutions').subscribe(data => this.solutions = data);
  }

  get categories() {
    return ['All', ...new Set(this.solutions.map(solution => solution.category))];
  }

  get filteredSolutions() {
    return this.solutions.filter(solution => {
      const matchesCategory = this.activeCategory === 'All' || solution.category === this.activeCategory;
      const matchesSearch = !this.searchTerm ||
        solution.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        solution.desc.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
}
