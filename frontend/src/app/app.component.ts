import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Exoosis';
  showLayout = true;

  constructor(private router: Router) {
    this.showLayout = !(this.router.url.startsWith('/admin') || this.router.url.startsWith('/dashboard'));
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showLayout = !(event.urlAfterRedirects.startsWith('/admin') || event.urlAfterRedirects.startsWith('/dashboard'));
    });
  }
}
