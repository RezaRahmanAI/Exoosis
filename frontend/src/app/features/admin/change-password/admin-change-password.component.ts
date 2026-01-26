import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-change-password.component.html'
})
export class AdminChangePasswordComponent {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  message = '';
  error = '';

  constructor(private authService: AuthService) {}

  submit() {
    this.error = '';
    this.message = '';
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.error = 'Please complete all fields.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.error = 'Not authenticated.';
      return;
    }
    this.authService.changePassword(user.id, this.currentPassword, this.newPassword).subscribe(result => {
      if (!result.success) {
        this.error = result.message || 'Unable to update password.';
        return;
      }
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.message = 'Password updated successfully.';
    });
  }
}
