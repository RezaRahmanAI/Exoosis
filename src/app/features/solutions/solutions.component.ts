import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { SolutionSoftware } from '../../core/models/entities';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.css'
})
export class SolutionsComponent implements OnInit {
  softwareCatalog: SolutionSoftware[] = [];
  searchTerm = '';
  selectedCategory: 'All' | SolutionSoftware['category'] = 'All';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<SolutionSoftware[]>('/solutionSoftware').subscribe(data => this.softwareCatalog = data);
  }

  get categories() {
    const unique = Array.from(new Set(this.softwareCatalog.map(item => item.category)));
    return ['All', ...unique] as Array<'All' | SolutionSoftware['category']>;
  }

  get filteredSoftware() {
    return this.softwareCatalog.filter(item => {
      const matchesCategory = this.selectedCategory === 'All' || item.category === this.selectedCategory;
      const matchesSearch = !this.searchTerm
        || item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.summary.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
}
