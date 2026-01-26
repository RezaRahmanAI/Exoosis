import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  email = '';
  message = '';
  token = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  submit() {
    this.message = '';
    this.errorMessage = '';
    if (!this.email) {
      this.errorMessage = 'Please enter your email.';
      return;
    }
    this.authService.requestPasswordReset(this.email).subscribe(result => {
      if (!result.success) {
        this.errorMessage = result.message || 'Unable to send reset link.';
        return;
      }
      this.token = result.token || '';
      this.message = 'Password reset link sent! Use the token below to reset your password.';
    });
  }
}
