import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BrandService } from '../../core/services/brand.service';
import { Partner } from '../../core/models/entities';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent implements OnInit {
  partners: Partner[] = [];

  constructor(private brandService: BrandService) {}

  ngOnInit() {
    this.brandService.getBrands().subscribe(data => {
      this.partners = data.filter(partner => partner.isActive);
    });
  }
}
