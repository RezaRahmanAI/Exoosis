import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  token = '';
  newPassword = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.errorMessage = '';
    this.successMessage = '';
    if (!this.token || !this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    this.authService.resetPassword(this.token, this.newPassword).subscribe(result => {
      if (!result.success) {
        this.errorMessage = result.message || 'Unable to reset password.';
        return;
      }
      this.successMessage = 'Password updated successfully. Redirecting to login...';
      setTimeout(() => this.router.navigate(['/auth/login']), 1200);
    });
  }
}
