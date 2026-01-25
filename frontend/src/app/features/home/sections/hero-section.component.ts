import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-hero-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-section.component.html'
})
export class HeroSectionComponent {}
