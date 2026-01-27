import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Job } from '../../core/models/entities';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './career.component.html',
  styleUrl: './career.component.css'
})
export class CareerComponent implements OnInit {
  jobs: Job[] = [];
  private readonly mockStorageKey = 'exoosis_mock_jobs';
  perks = [
    { icon: 'trending_up', title: 'Growth Opportunities', desc: 'Access to paid certifications and workshops.' },
    { icon: 'medical_services', title: 'Comprehensive Health', desc: 'Full medical insurance coverage for you and your family.' },
    { icon: 'diversity_3', title: 'Collaborative Culture', desc: 'A flat hierarchy where every voice matters.' }
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    if (environment.useMockData) {
      this.jobs = this.loadMockJobs();
      return;
    }

    this.api.get<Job[]>('/jobs').subscribe(data => this.jobs = data);
  }

  private loadMockJobs(): Job[] {
    const stored = localStorage.getItem(this.mockStorageKey);
    if (!stored) {
      const seeded: Job[] = [
        {
          id: 1,
          title: 'Senior Solutions Architect',
          location: 'Dhaka',
          type: 'Full-time',
          typeIcon: 'schedule',
          category: 'Engineering',
          description: 'Lead enterprise solution design for flagship clients.',
          responsibilities: ['Client discovery', 'Technical workshops', 'Solution design'],
          requirements: ['5+ years experience', 'Cloud architecture', 'Stakeholder management'],
          team: 'Delivery',
          salary: 'Competitive',
          datePosted: 'Aug 15, 2024'
        },
        {
          id: 2,
          title: 'Customer Success Manager',
          location: 'Remote',
          type: 'Hybrid',
          typeIcon: 'work_history',
          category: 'Customer Success',
          description: 'Own enterprise onboarding journeys and adoption plans.',
          responsibilities: ['Onboarding', 'Renewals', 'Quarterly reviews'],
          requirements: ['SaaS experience', 'Account management', 'Strong communication'],
          team: 'Customer Success',
          salary: 'Negotiable',
          datePosted: 'Aug 10, 2024'
        }
      ];
      localStorage.setItem(this.mockStorageKey, JSON.stringify(seeded));
      return seeded;
    }

    try {
      return JSON.parse(stored) as Job[];
    } catch {
      return [];
    }
  }
}
