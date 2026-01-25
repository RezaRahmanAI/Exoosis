import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import {
  Solution,
  Partner,
  Testimonial,
  PeripheralCategory,
  LaptopProduct,
  OfficeSolution,
  ConsumableItem,
  Insight
} from '../../core/models/entities';
import { HeroSectionComponent } from './sections/hero-section.component';
import { PartnersSectionComponent } from './sections/partners-section.component';
import { SolutionsSectionComponent } from './sections/solutions-section.component';
import { PartsAccessoriesSectionComponent } from './sections/parts-accessories-section.component';
import { PeripheralsSectionComponent } from './sections/peripherals-section.component';
import { OfficeSolutionsSectionComponent } from './sections/office-solutions-section.component';
import { ConsumablesSectionComponent } from './sections/consumables-section.component';
import { TestimonialSectionComponent } from './sections/testimonial-section.component';
import { ExpertsSectionComponent } from './sections/experts-section.component';
import { InsightsSectionComponent } from './sections/insights-section.component';
import { BulkProcurementSectionComponent } from './sections/bulk-procurement-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    PartnersSectionComponent,
    SolutionsSectionComponent,
    PartsAccessoriesSectionComponent,
    PeripheralsSectionComponent,
    OfficeSolutionsSectionComponent,
    // ConsumablesSectionComponent,
    TestimonialSectionComponent,
    ExpertsSectionComponent,
    InsightsSectionComponent,
    BulkProcurementSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  solutions: Solution[] = [];
  logos: Partner[] = [];
  categories: PeripheralCategory[] = [];
  laptops: LaptopProduct[] = [];
  officeSolutions: OfficeSolution[] = [];
  consumables: ConsumableItem[] = [];
  testimonials: Testimonial[] = [];
  insights: Insight[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<Solution[]>('/solutions').subscribe(data => this.solutions = data.slice(0, 3));
    this.api.get<Partner[]>('/partners').subscribe(data => this.logos = data);
    this.api.get<Testimonial[]>('/testimonials').subscribe(data => {
      this.testimonials = data;
    });
    this.api.get<PeripheralCategory[]>('/peripheralCategories').subscribe(data => this.categories = data);
    this.api.get<LaptopProduct[]>('/laptopProducts').subscribe(data => this.laptops = data);
    this.api.get<OfficeSolution[]>('/officeSolutions').subscribe(data => this.officeSolutions = data);
    this.api.get<ConsumableItem[]>('/consumables').subscribe(data => this.consumables = data);
    this.api.get<Insight[]>('/insights').subscribe(data => this.insights = data);
  }
}
