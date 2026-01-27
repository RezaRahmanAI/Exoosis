import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductDetail } from '../../../core/models/entities';

@Component({
  selector: 'app-home-parts-accessories-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './parts-accessories-section.component.html',
})
export class PartsAccessoriesSectionComponent {
  @Input() products: ProductDetail[] = [];
}
