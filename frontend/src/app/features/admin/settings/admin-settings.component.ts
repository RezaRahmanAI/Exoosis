import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SettingsService } from '../../../core/services/settings.service';
import { WebsiteSettings } from '../../../core/models/entities';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-settings.component.html'
})
export class AdminSettingsComponent {
  activeTab: 'general' | 'contact' | 'social' | 'business' | 'seo' | 'admin' = 'general';
  settings: WebsiteSettings | null = null;
  paymentMethodsText = '';
  message = '';

  constructor(private settingsService: SettingsService) {
    this.settingsService.getAllSettings().subscribe();
    this.settingsService.settings$.subscribe(data => {
      if (!data) {
        return;
      }
      this.settings = JSON.parse(JSON.stringify(data));
      this.paymentMethodsText = this.settings.business.paymentMethods.join(', ');
    });
  }

  setTab(tab: typeof this.activeTab) {
    this.activeTab = tab;
    this.message = '';
  }

  save() {
    if (!this.settings) {
      return;
    }
    this.settingsService.updateSettings(this.settings).subscribe(() => {
      this.message = 'Settings updated successfully.';
    });
  }

  updatePaymentMethods(value: string) {
    this.paymentMethodsText = value;
    if (this.settings) {
      this.settings.business.paymentMethods = value.split(',').map(item => item.trim()).filter(Boolean);
    }
  }
}
