import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './user-settings.component.html'
})
export class UserSettingsComponent {
  preferences = {
    language: 'en',
    currency: 'USD',
    marketingEmails: true,
    orderUpdates: true
  };

  message = '';

  save() {
    this.message = 'Settings saved successfully.';
  }
}
