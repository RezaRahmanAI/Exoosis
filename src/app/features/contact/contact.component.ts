import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  payload = {
    fullName: '',
    company: '',
    email: '',
    phone: '',
    category: 'Industrial',
    message: ''
  };

  submitted = false;

  submit() {
    this.submitted = true;
  }
}
