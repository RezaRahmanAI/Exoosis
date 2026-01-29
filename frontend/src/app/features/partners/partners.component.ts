import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../core/services/brand.service';
import { PartnerCategory } from '../../core/models/entities';
import { ApiBrand } from '../../core/models/catalog';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { PageHeroContentService } from '../../core/services/page-hero-content.service';
import { PageHeroContent } from '../../core/models/catalog';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent implements OnInit {
  partners: ApiBrand[] = [];
  pageHeroContent: PageHeroContent | null = null;
  categories = [
    {
      id: 'computing',
      key: PartnerCategory.ComputingHardware,
      label: 'Computing & Hardware',
      description: 'Workstations, servers, and peripherals from top manufacturers.',
      icon: 'computer'
    },
    {
      id: 'network',
      key: PartnerCategory.Network,
      label: 'Network',
      description: 'Enterprise-grade connectivity and infrastructure.',
      icon: 'router'
    },
    {
      id: 'security',
      key: PartnerCategory.Security,
      label: 'Security',
      description: 'Advanced surveillance and access control systems.',
      icon: 'shield'
    }
  ];

  constructor(
    private brandService: BrandService,
    private pageHeroService: PageHeroContentService,
  ) {}

  ngOnInit() {
    this.pageHeroService
      .getActive('partners')
      .pipe(
        take(1),
        catchError(() => of(null)),
      )
      .subscribe((data) => {
        this.pageHeroContent = data;
      });

    this.brandService.getBrands().subscribe(data => {
      this.partners = data.filter(partner => partner.isActive);
    });
  }

  partnersForCategory(category: PartnerCategory) {
    return this.partners.filter(partner => partner.category === category);
  }
}
