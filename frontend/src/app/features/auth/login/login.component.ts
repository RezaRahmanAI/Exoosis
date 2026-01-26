import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  identifier = '';
  password = '';
  rememberMe = true;
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.errorMessage = '';
    if (!this.identifier || !this.password) {
      this.errorMessage = 'Please enter your email/username and password.';
      return;
    }
    this.loading = true;
    this.authService.login(this.identifier, this.password).subscribe(user => {
      this.loading = false;
      if (!user) {
        this.errorMessage = 'Invalid credentials. Please try again.';
        return;
      }
      if (user.role === 'Admin') {
        this.router.navigate(['/dashboard']);
        return;
      }
      this.router.navigate(['/']);
    });
  }
}
