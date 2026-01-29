import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { EnterpriseSoftware } from '../../core/models/entities';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-enterprise-software',
  standalone: true,
  imports: [CommonModule, RouterLink, PageHeaderComponent],
  templateUrl: './enterprise-software.component.html',
  styleUrl: './enterprise-software.component.css'
})
export class EnterpriseSoftwareComponent implements OnInit {
  platform?: EnterpriseSoftware;
  isLoading = true;
  errorMessage = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<EnterpriseSoftware[]>('/enterpriseSoftware').subscribe({
      next: (data) => {
        this.platform = data[0];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load enterprise software details right now.';
        this.isLoading = false;
      }
    });
  }
}
