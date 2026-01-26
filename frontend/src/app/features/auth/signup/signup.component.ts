import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Address } from '../../../core/models/entities';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  fullName = '';
  email = '';
  phoneNumber = '';
  password = '';
  confirmPassword = '';
  acceptTerms = false;
  address: Address = {};
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  get passwordChecks() {
    return {
      length: this.password.length >= 8,
      uppercase: /[A-Z]/.test(this.password),
      lowercase: /[a-z]/.test(this.password),
      number: /\d/.test(this.password),
      special: /[^A-Za-z0-9]/.test(this.password)
    };
  }

  get passwordValid() {
    const checks = this.passwordChecks;
    return checks.length && checks.uppercase && checks.lowercase && checks.number && checks.special;
  }

  submit() {
    this.errorMessage = '';
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword || !this.phoneNumber) {
      this.errorMessage = 'Please complete all required fields.';
      return;
    }
    if (!this.passwordValid) {
      this.errorMessage = 'Password does not meet the strength requirements.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    if (!this.acceptTerms) {
      this.errorMessage = 'Please accept the terms & conditions.';
      return;
    }
    this.loading = true;
    this.authService.signup({
      name: this.fullName,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      address: this.address
    }).subscribe(result => {
      this.loading = false;
      if (!result.success) {
        this.errorMessage = result.message || 'Unable to create account.';
        return;
      }
      this.router.navigate(['/']);
    });
  }
}
