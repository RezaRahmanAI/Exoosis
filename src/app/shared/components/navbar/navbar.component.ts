import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoginOpen = false;
  loginEmail = '';
  loginPassword = '';
  loginError = '';

  constructor(private cartService: CartService, private authService: AuthService) {}

  get cartCount$() {
    return this.cartService.cartCount$;
  }

  get cartItems$() {
    return this.cartService.cartItems$;
  }

  get cartTotal$() {
    return this.cartService.cartTotal$;
  }

  get user$() {
    return this.authService.user$;
  }

  toggleLogin() {
    this.isLoginOpen = !this.isLoginOpen;
    this.loginError = '';
  }

  login() {
    if (!this.loginEmail || !this.loginPassword) {
      this.loginError = 'Please enter your email and password.';
      return;
    }

    this.authService.login(this.loginEmail, this.loginPassword).subscribe(user => {
      if (!user) {
        this.loginError = 'Invalid credentials. Try demo: arafat@exoosis.com';
        return;
      }
      this.loginEmail = '';
      this.loginPassword = '';
      this.isLoginOpen = false;
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.isLoginOpen = false;
    });
  }
}
