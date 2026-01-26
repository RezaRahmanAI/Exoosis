import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandService } from '../../../core/services/brand.service';
import { Partner } from '../../../core/models/entities';

@Component({
  selector: 'app-partner-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './partner-details.component.html'
})
export class PartnerDetailsComponent implements OnInit {
  partner?: Partner;
  isLoading = true;

  constructor(private route: ActivatedRoute, private brandService: BrandService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.isLoading = false;
      return;
    }

    this.brandService.getBrandById(id).subscribe({
      next: data => {
        this.partner = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
