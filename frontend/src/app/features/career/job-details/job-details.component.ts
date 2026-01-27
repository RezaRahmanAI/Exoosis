import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { Job, JobApplicationPayload } from '../../../core/models/entities';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  job?: Job;
  private readonly mockStorageKey = 'exoosis_mock_jobs';
  application: JobApplicationPayload = {
    jobId: 0,
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedInUrl: '',
    portfolioUrl: '',
    resumeUrl: '',
    coverLetter: ''
  };
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      if (environment.useMockData) {
        const jobs = this.loadMockJobs();
        this.job = jobs.find(job => job.id === Number(id));
        if (this.job) {
          this.application.jobId = this.job.id;
        }
        return;
      }

      this.api.get<Job>(`/jobs/${id}`).subscribe(data => {
        this.job = data;
        this.application.jobId = data.id;
      });
    }
  }

  submitApplication() {
    if (!this.job) return;
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    if (environment.useMockData) {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.application = {
        jobId: this.job?.id ?? 0,
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedInUrl: '',
        portfolioUrl: '',
        resumeUrl: '',
        coverLetter: ''
      };
      return;
    }

    this.api.post<JobApplicationPayload>('/jobApplications', this.application).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.application = {
          jobId: this.job?.id ?? 0,
          fullName: '',
          email: '',
          phone: '',
          location: '',
          linkedInUrl: '',
          portfolioUrl: '',
          resumeUrl: '',
          coverLetter: ''
        };
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = 'Unable to submit your application. Please try again.';
      }
    });
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
