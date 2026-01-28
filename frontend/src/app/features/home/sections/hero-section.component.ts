import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HeroContent } from '../../../core/models/catalog';
import { HeroContentService } from '../../../core/services/hero-content.service';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Component({
  selector: 'app-home-hero-section',
  standalone: true,
  imports: [RouterLink, CommonModule, AsyncPipe],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent implements OnInit {
  @Input() set content(value: HeroContent | null | undefined) {
    this.resolvedContent = value ?? null;
  }

  resolvedContent: HeroContent | null = null;
  loading$ = this.heroService.loading$;
  error$ = this.heroService.error$;

  constructor(private heroService: HeroContentService) {}

  ngOnInit(): void {
    if (!this.resolvedContent) {
      this.heroService
        .getActive()
        .pipe(
          take(1),
          catchError(() => of(null)),
        )
        .subscribe((data) => {
          this.resolvedContent = data;
        });
    }
  }
}
