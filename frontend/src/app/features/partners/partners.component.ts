import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BrandService } from '../../core/services/brand.service';
import { PartnerCategory } from '../../core/models/entities';
import { ApiBrand } from '../../core/models/catalog';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, RouterLink, PageHeaderComponent],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent implements OnInit {
  partners: ApiBrand[] = [];
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

  constructor(private brandService: BrandService) {}

  ngOnInit() {
    this.brandService.getBrands().subscribe(data => {
      this.partners = data.filter(partner => partner.isActive);
    });
  }

  partnersForCategory(category: PartnerCategory) {
    return this.partners.filter(partner => partner.category === category);
  }
}
