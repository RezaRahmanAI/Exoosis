import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  constructor(private settingsService: SettingsService) {}

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

  submit() {
    this.submitted = true;
  }
}
