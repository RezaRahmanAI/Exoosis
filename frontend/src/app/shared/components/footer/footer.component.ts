import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private settingsService: SettingsService) {}

  get settings$() {
    return this.settingsService.settings$;
  }
}
