import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolutionService } from '../../core/services/solution.service';
import { Solution, SolutionCategory } from '../../core/models/entities';
import { SolutionCategoryPipe } from '../../core/pipes/solution-category.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { PageHeroContentService } from '../../core/services/page-hero-content.service';
import { PageHeroContent } from '../../core/models/catalog';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SolutionCategoryPipe, PageHeaderComponent],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.css',
})
export class SolutionsComponent implements OnInit {
  softwareCatalog: Solution[] = [];
  searchTerm = '';
  selectedCategory: 'All' | string = 'All';
  pageHeroContent: PageHeroContent | null = null;

  constructor(
    private solutionService: SolutionService,
    private pageHeroService: PageHeroContentService,
  ) {}

  ngOnInit() {
    this.pageHeroService
      .getActive('solutions')
      .pipe(
        take(1),
        catchError(() => of(null)),
      )
      .subscribe((data) => {
        this.pageHeroContent = data;
      });

    this.solutionService.getSolutions().subscribe((data) => {
      this.softwareCatalog = data;
    });
  }

  get categories() {
    const uniqueEnums = Array.from(new Set(this.softwareCatalog.map((item) => item.category)));
    const categoryNames = uniqueEnums.map((enumValue) => SolutionCategory[enumValue]);
    return ['All', ...categoryNames];
  }

  get filteredSoftware() {
    return this.softwareCatalog.filter((item) => {
      let matchesCategory = this.selectedCategory === 'All';
      if (!matchesCategory) {
        // Convert the selected category name back to enum value for comparison
        const categoryEnum =
          SolutionCategory[this.selectedCategory as keyof typeof SolutionCategory];
        matchesCategory = item.category === categoryEnum;
      }
      const name = item.name ?? '';
      const summary = item.summary ?? '';
      const matchesSearch =
        !this.searchTerm ||
        name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        summary.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
