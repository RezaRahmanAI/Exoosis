import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../core/services/settings.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { PageHeroContentService } from '../../core/services/page-hero-content.service';
import { PageHeroContent } from '../../core/models/catalog';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  constructor(
    private settingsService: SettingsService,
    private pageHeroService: PageHeroContentService,
  ) {}

  pageHeroContent: PageHeroContent | null = null;

  payload = {
    fullName: '',
    email: '',
    topic: '',
    orderId: '',
    message: ''
  };

  submitted = false;

  get settings$() {
    return this.settingsService.settings$;
  }

  ngOnInit() {
    this.pageHeroService
      .getActive('contact')
      .pipe(
        take(1),
        catchError(() => of(null)),
      )
      .subscribe((data) => {
        this.pageHeroContent = data;
      });
  }

  submit() {
    this.submitted = true;
  }
}
