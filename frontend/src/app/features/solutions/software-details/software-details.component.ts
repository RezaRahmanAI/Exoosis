import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SolutionService } from '../../../core/services/solution.service';
import { Solution } from '../../../core/models/entities';
import { SolutionCategoryPipe } from '../../../core/pipes/solution-category.pipe';

@Component({
  selector: 'app-software-details',
  standalone: true,
  imports: [CommonModule, RouterLink, SolutionCategoryPipe],
  templateUrl: './software-details.component.html',
})
export class SoftwareDetailsComponent implements OnInit {
  software?: Solution;

  constructor(
    private route: ActivatedRoute,
    private solutionService: SolutionService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.solutionService.getSolutionById(id).subscribe({
      next: (data) => {
        this.software = data;
      },
    });
  }
}
