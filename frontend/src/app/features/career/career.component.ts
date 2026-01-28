import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Job } from '../../core/models/entities';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './career.component.html',
  styleUrl: './career.component.css'
})
export class CareerComponent implements OnInit {
  jobs: Job[] = [];
  perks = [
    { icon: 'trending_up', title: 'Growth Opportunities', desc: 'Access to paid certifications and workshops.' },
    { icon: 'medical_services', title: 'Comprehensive Health', desc: 'Full medical insurance coverage for you and your family.' },
    { icon: 'diversity_3', title: 'Collaborative Culture', desc: 'A flat hierarchy where every voice matters.' }
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<unknown>('/jobs').subscribe(data => {
      this.jobs = this.normalizeJobs(data);
    });
  }

  private normalizeJobs(data: unknown): Job[] {
    if (Array.isArray(data)) {
      return data as Job[];
    }

    if (data && typeof data === 'object') {
      const record = data as { jobs?: Job[]; data?: Job[]; items?: Job[] };
      const jobs = record.jobs ?? record.data ?? record.items;
      if (Array.isArray(jobs)) {
        return jobs;
      }
    }

    return [];
  }
}
