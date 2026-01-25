import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface LaptopProduct {
  title: string;
  desc: string;
  image: string;
  tag: string;
  features: string[];
}

@Component({
  selector: 'app-home-parts-accessories-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './parts-accessories-section.component.html'
})
export class PartsAccessoriesSectionComponent {
  @Input() laptops: LaptopProduct[] = [];
}
