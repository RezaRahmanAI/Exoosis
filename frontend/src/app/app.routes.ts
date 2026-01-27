import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { SolutionsComponent } from './features/solutions/solutions.component';
import { CareerComponent } from './features/career/career.component';
import { PartnersComponent } from './features/partners/partners.component';
import { PartnerDetailsComponent } from './features/partners/partner-details/partner-details.component';
import { ProductDetailsComponent } from './features/products/product-details/product-details.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { CategoryListComponent } from './features/categories/category-list/category-list.component';
import { EnterpriseSoftwareComponent } from './features/enterprise-software/enterprise-software.component';
import { SoftwareDetailsComponent } from './features/solutions/software-details/software-details.component';
import { ContactComponent } from './features/contact/contact.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { ProfileComponent } from './features/profile/profile.component';
import { MyOrdersComponent } from './features/my-orders/my-orders.component';
import { UserSettingsComponent } from './features/user-settings/user-settings.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

import { AdminLayoutComponent } from './features/admin/admin-layout.component';
import { CheckoutComponent } from './features/checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'solutions', component: SolutionsComponent },
  { path: 'solutions/software/:id', component: SoftwareDetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'categories', component: CategoryListComponent },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart-page/cart-page.component').then((m) => m.CartPageComponent),
  },
  { path: 'enterprise-software', component: EnterpriseSoftwareComponent },
  { path: 'partners/:id', component: PartnerDetailsComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'career', component: CareerComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/reset-password', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [authGuard] },
  { path: 'settings', component: UserSettingsComponent, canActivate: [authGuard] },
  {
    path: 'career/:id',
    loadComponent: () =>
      import('./features/career/job-details/job-details.component').then(
        (m) => m.JobDetailsComponent,
      ),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/admin/settings/admin-settings.component').then(
            (m) => m.AdminSettingsComponent,
          ),
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./features/admin/change-password/admin-change-password.component').then(
            (m) => m.AdminChangePasswordComponent,
          ),
      },
      {
        path: 'solutions',
        loadComponent: () =>
          import('./features/admin/solutions/solutions.component').then(
            (m) => m.AdminSolutionsComponent,
          ),
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/admin/brands/brands.component').then((m) => m.AdminBrandsComponent),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/admin/categories/categories.component').then(
            (m) => m.AdminCategoriesComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/admin/products/products.component').then(
            (m) => m.AdminProductsComponent,
          ),
      },
      {
        path: 'jobs',
        loadComponent: () =>
          import('./features/admin/jobs/jobs.component').then((m) => m.AdminJobsComponent),
      },
      {
        path: 'team',
        loadComponent: () =>
          import('./features/admin/team/team.component').then((m) => m.AdminTeamComponent),
      },
      {
        path: 'testimonials',
        loadComponent: () =>
          import('./features/admin/testimonials/testimonials.component').then(
            (m) => m.AdminTestimonialsComponent,
          ),
      },
      {
        path: 'hero',
        loadComponent: () =>
          import('./features/admin/hero/admin-hero.component').then((m) => m.AdminHeroComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/admin/orders/orders.component').then((m) => m.AdminOrdersComponent),
      },
    ],
  },
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/admin/settings/admin-settings.component').then(
            (m) => m.AdminSettingsComponent,
          ),
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./features/admin/change-password/admin-change-password.component').then(
            (m) => m.AdminChangePasswordComponent,
          ),
      },
      {
        path: 'solutions',
        loadComponent: () =>
          import('./features/admin/solutions/solutions.component').then(
            (m) => m.AdminSolutionsComponent,
          ),
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/admin/brands/brands.component').then((m) => m.AdminBrandsComponent),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/admin/categories/categories.component').then(
            (m) => m.AdminCategoriesComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/admin/products/products.component').then(
            (m) => m.AdminProductsComponent,
          ),
      },
      {
        path: 'jobs',
        loadComponent: () =>
          import('./features/admin/jobs/jobs.component').then((m) => m.AdminJobsComponent),
      },
      {
        path: 'team',
        loadComponent: () =>
          import('./features/admin/team/team.component').then((m) => m.AdminTeamComponent),
      },
      {
        path: 'testimonials',
        loadComponent: () =>
          import('./features/admin/testimonials/testimonials.component').then(
            (m) => m.AdminTestimonialsComponent,
          ),
      },
      {
        path: 'hero',
        loadComponent: () =>
          import('./features/admin/hero/admin-hero.component').then((m) => m.AdminHeroComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/admin/orders/orders.component').then((m) => m.AdminOrdersComponent),
      },
    ],
  },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout/callback', component: CheckoutComponent },
  { path: '**', redirectTo: '' },
];
