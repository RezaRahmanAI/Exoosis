import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { SolutionSoftware } from '../../../core/models/entities';

@Component({
  selector: 'app-software-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './software-details.component.html'
})
export class SoftwareDetailsComponent implements OnInit {
  software?: SolutionSoftware;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.get<SolutionSoftware[]>('/solutionSoftware').subscribe(data => {
      this.software = data.find(item => item.id === id);
    });
  }
}
