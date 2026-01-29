import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { AdminLayoutComponent } from './features/admin/admin-layout.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'solutions',
    loadComponent: () =>
      import('./features/solutions/solutions.component').then((m) => m.SolutionsComponent),
  },
  {
    path: 'solutions/software/:id',
    loadComponent: () =>
      import('./features/solutions/software-details/software-details.component').then(
        (m) => m.SoftwareDetailsComponent,
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/product-list/product-list.component').then(
        (m) => m.ProductListComponent,
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent,
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/category-list/category-list.component').then(
        (m) => m.CategoryListComponent,
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart-page/cart-page.component').then((m) => m.CartPageComponent),
  },
  {
    path: 'enterprise-software',
    loadComponent: () =>
      import('./features/enterprise-software/enterprise-software.component').then(
        (m) => m.EnterpriseSoftwareComponent,
      ),
  },
  {
    path: 'partners',
    loadComponent: () =>
      import('./features/partners/partners.component').then((m) => m.PartnersComponent),
  },
  {
    path: 'career',
    loadComponent: () =>
      import('./features/career/career.component').then((m) => m.CareerComponent),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'auth/signup',
    loadComponent: () =>
      import('./features/auth/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'auth/forgot-password',
    loadComponent: () =>
      import('./features/auth/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent,
      ),
  },
  {
    path: 'auth/reset-password',
    loadComponent: () =>
      import('./features/auth/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent,
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: 'my-orders',
    loadComponent: () =>
      import('./features/my-orders/my-orders.component').then((m) => m.MyOrdersComponent),
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/user-settings/user-settings.component').then(
        (m) => m.UserSettingsComponent,
      ),
    canActivate: [authGuard],
  },
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
        redirectTo: 'dashboard',
        pathMatch: 'full',
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
        path: 'respected-clients',
        loadComponent: () =>
          import('./features/admin/respected-clients/respected-clients.component').then(
            (m) => m.AdminRespectedClientsComponent,
          ),
      },
      {
        path: 'hero',
        loadComponent: () =>
          import('./features/admin/hero/admin-hero.component').then((m) => m.AdminHeroComponent),
      },
      {
        path: 'page-hero',
        loadComponent: () =>
          import('./features/admin/page-hero/admin-page-hero.component').then(
            (m) => m.AdminPageHeroComponent,
          ),
      },
      {
        path: 'about-mission',
        loadComponent: () =>
          import('./features/admin/about-mission/admin-about-mission.component').then(
            (m) => m.AdminAboutMissionComponent,
          ),
      },
      {
        path: 'about-core-values',
        loadComponent: () =>
          import('./features/admin/about-core-values/admin-about-core-values.component').then(
            (m) => m.AdminAboutCoreValuesComponent,
          ),
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
    redirectTo: 'admin/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
  {
    path: 'checkout/callback',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
  { path: '**', redirectTo: '' },
];
