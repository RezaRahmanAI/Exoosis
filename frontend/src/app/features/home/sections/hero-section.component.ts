import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroContent } from '../../../core/models/catalog';

@Component({
  selector: 'app-home-hero-section',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  @Input() content?: HeroContent | null;
}
