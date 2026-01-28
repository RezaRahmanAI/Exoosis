import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { Job, JobApplicationPayload } from '../../../core/models/entities';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  job?: Job;
  application: JobApplicationPayload = {
    jobId: '',
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
      this.api.get<unknown>(`/jobs/${id}`).subscribe(data => {
        const job = this.normalizeJob(data);
        if (job) {
          this.job = job;
          this.application.jobId = job.id;
        }
      });
    }
  }

  submitApplication() {
    if (!this.job) return;
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    this.api.post<JobApplicationPayload>('/jobApplications', this.application).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.application = {
          jobId: this.job?.id ?? '',
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

  private normalizeJob(data: unknown): Job | undefined {
    if (!data) {
      return undefined;
    }

    if (typeof data === 'object') {
      const record = data as { data?: Job };
      if (record.data) {
        return record.data;
      }
    }

    return data as Job;
  }
}
