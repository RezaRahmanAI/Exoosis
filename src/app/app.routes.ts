import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { SolutionsComponent } from './features/solutions/solutions.component';
import { CareerComponent } from './features/career/career.component';

import { AdminLayoutComponent } from './features/admin/admin-layout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'solutions', component: SolutionsComponent },
  { path: 'career', component: CareerComponent },
  { 
    path: 'career/:id', 
    loadComponent: () => import('./features/career/job-details/job-details.component').then(m => m.JobDetailsComponent) 
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      { 
        path: 'solutions', 
        loadComponent: () => import('./features/admin/solutions/solutions.component').then(m => m.AdminSolutionsComponent) 
      },
      { 
        path: 'jobs', 
        loadComponent: () => import('./features/admin/jobs/jobs.component').then(m => m.AdminJobsComponent) 
      },
      { 
        path: 'team', 
        loadComponent: () => import('./features/admin/team/team.component').then(m => m.AdminTeamComponent) 
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
