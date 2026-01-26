import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private settingsService: SettingsService,
    private router: Router
  ) {}

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

  get settings$() {
    return this.settingsService.settings$;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.isMenuOpen = false;
      this.router.navigate(['/']);
    });
  }
}
