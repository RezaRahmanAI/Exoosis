import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, forkJoin, map, of } from 'rxjs';
import { SolutionService } from '../../../core/services/solution.service';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { BrandService } from '../../../core/services/brand.service';
import { TeamService } from '../../../core/services/team.service';
import { ApiBrand, ApiCategory } from '../../../core/models/catalog';
import { ProductDetail, Solution, TeamMember } from '../../../core/models/entities';

interface DashboardActivity {
  title: string;
  meta: string;
  createdAt: string;
  icon: string;
  accent: string;
}

interface DashboardStats {
  totalSolutions: number;
  featuredSolutions: number;
  activeSolutions: number;
  totalProducts: number;
  lowStockCount: number;
  totalBrands: number;
  activeBrands: number;
  totalCategories: number;
  activeCategories: number;
  totalTeamMembers: number;
  leadershipCount: number;
}

interface DashboardData {
  updatedAt: Date;
  stats: DashboardStats;
  recentActivity: DashboardActivity[];
  lowStock: ProductDetail[];
  teamMembers: TeamMember[];
}

interface DashboardState {
  data: DashboardData | null;
  error: string | null;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="dashboard$ | async as state">
      <ng-container *ngIf="state.data; else dashboardError">
        <div class="flex flex-col gap-8">
          <header class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p class="text-sm font-semibold text-slate-400 uppercase tracking-[0.3em]">Admin overview</p>
          <h1 class="text-2xl md:text-3xl font-bold text-slate-900">Operations dashboard</h1>
          <p class="text-sm text-slate-500 mt-2">
            Live operational stats sourced from your catalog and team records.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button class="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary transition">Export report</button>
          <button class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20">Create update</button>
        </div>
          </header>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-slate-500">Total Solutions</span>
            <span class="material-symbols-outlined text-primary">hub</span>
          </div>
          <div class="mt-4 flex items-end justify-between">
            <span class="text-3xl font-bold text-slate-900">{{ state.data.stats.totalSolutions }}</span>
            <span class="text-xs font-semibold text-green-500">{{ state.data.stats.featuredSolutions }} featured</span>
          </div>
          <div class="mt-4 h-2 rounded-full bg-slate-100">
            <div
              class="h-2 rounded-full bg-primary"
              [style.width.%]="state.data.stats.totalSolutions ? (state.data.stats.activeSolutions / state.data.stats.totalSolutions) * 100 : 0"
            ></div>
          </div>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-slate-500">Product Catalog</span>
            <span class="material-symbols-outlined text-primary">inventory_2</span>
          </div>
          <div class="mt-4 flex items-end justify-between">
            <span class="text-3xl font-bold text-slate-900">{{ state.data.stats.totalProducts }}</span>
            <span class="text-xs font-semibold text-amber-500">{{ state.data.stats.lowStockCount }} low stock</span>
          </div>
          <div class="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span class="material-symbols-outlined text-base">stacked_line_chart</span>
            {{ state.data.stats.totalCategories }} categories · {{ state.data.stats.totalBrands }} brands
          </div>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-slate-500">Team Members</span>
            <span class="material-symbols-outlined text-primary">groups</span>
          </div>
          <div class="mt-4 flex items-end justify-between">
            <span class="text-3xl font-bold text-slate-900">{{ state.data.stats.totalTeamMembers }}</span>
            <span class="text-xs font-semibold text-slate-400">{{ state.data.stats.leadershipCount }} leadership</span>
          </div>
          <div class="mt-4 flex -space-x-3">
            <div
              *ngFor="let member of state.data.teamMembers.slice(0, 4)"
              class="h-8 w-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 flex items-center justify-center text-[10px] font-semibold text-slate-600"
            >
              <ng-container *ngIf="member.imageUrl; else fallbackInitials">
                <img [src]="member.imageUrl" [alt]="member.name" class="h-full w-full object-cover" />
              </ng-container>
              <ng-template #fallbackInitials>{{ member.name | slice: 0:2 }}</ng-template>
            </div>
          </div>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-slate-500">Catalog Health</span>
            <span class="material-symbols-outlined text-green-500">monitor_heart</span>
          </div>
          <div class="mt-4 flex items-end justify-between">
            <span class="text-3xl font-bold text-green-500">{{ state.data.stats.activeBrands }} active</span>
            <span class="text-xs font-semibold text-slate-400">{{ state.data.stats.activeCategories }} active categories</span>
          </div>
          <div class="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span class="material-symbols-outlined text-base">sync</span>
            Updated {{ state.data.updatedAt | date: 'shortTime' }}
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div class="xl:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="p-6 border-b border-slate-100">
            <h3 class="font-bold text-slate-900">Recent activity</h3>
            <p class="text-sm text-slate-500 mt-1">Latest categories and brands added to the catalog.</p>
          </div>
          <div class="p-6 space-y-6" *ngIf="state.data.recentActivity.length; else noActivity">
            <div class="flex gap-4 items-start" *ngFor="let activity of state.data.recentActivity">
              <div class="w-9 h-9 rounded-full flex items-center justify-center" [ngClass]="activity.accent">
                <span class="material-symbols-outlined text-base">{{ activity.icon }}</span>
              </div>
              <div>
                <p class="text-sm text-slate-900 font-semibold">{{ activity.title }}</p>
                <p class="text-xs text-slate-400 mt-1">{{ activity.meta }} · {{ activity.createdAt | date: 'mediumDate' }}</p>
              </div>
            </div>
          </div>
          <ng-template #noActivity>
            <div class="p-6 text-sm text-slate-500">No recent catalog updates yet.</div>
          </ng-template>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="p-6 border-b border-slate-100">
            <h3 class="font-bold text-slate-900">Inventory alerts</h3>
            <p class="text-sm text-slate-500 mt-1">Products that need attention.</p>
          </div>
          <div class="p-6 space-y-4" *ngIf="state.data.lowStock.length; else noStockAlerts">
            <div class="flex items-start justify-between gap-4" *ngFor="let product of state.data.lowStock.slice(0, 4)">
              <div>
                <p class="text-sm font-semibold text-slate-800">{{ product.name }}</p>
                <p class="text-xs text-slate-400">{{ product.category || 'Uncategorized' }} · {{ product.brand || 'No brand' }}</p>
              </div>
              <span class="text-xs font-semibold text-amber-500">Low stock</span>
            </div>
            <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p class="text-xs text-slate-500 uppercase tracking-[0.2em]">Total alerts</p>
              <p class="text-sm font-semibold text-slate-800 mt-2">{{ state.data.stats.lowStockCount }} items below threshold</p>
            </div>
          </div>
          <ng-template #noStockAlerts>
            <div class="p-6 text-sm text-slate-500">No low-stock products right now.</div>
          </ng-template>
        </div>
        </div>
        </div>
      </ng-container>
      <ng-template #dashboardError>
        <div class="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-600">
          {{ state.error || 'Unable to load dashboard data.' }}
        </div>
      </ng-template>
    </ng-container>
  `
})
export class DashboardComponent {
  private readonly solutionService = inject(SolutionService);
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly brandService = inject(BrandService);
  private readonly teamService = inject(TeamService);

  readonly dashboard$ = forkJoin({
    solutions: this.solutionService.getSolutions(),
    products: this.productService.getProducts(),
    categories: this.categoryService.getCategories(),
    brands: this.brandService.getBrands(),
    teamMembers: this.teamService.getTeamMembers(),
    lowStock: this.productService.getLowStock()
  }).pipe(
    map(({ solutions, products, categories, brands, teamMembers, lowStock }) => {
      const stats = this.buildStats({ solutions, products, categories, brands, teamMembers, lowStock });
      return {
        data: {
          updatedAt: new Date(),
          stats,
          recentActivity: this.buildActivity(categories, brands),
          lowStock,
          teamMembers
        },
        error: null
      } satisfies DashboardState;
    }),
    catchError(error =>
      of({
        data: null,
        error: error?.error?.message || error?.message || 'Failed to load dashboard data.'
      } satisfies DashboardState)
    )
  );

  private buildStats(payload: {
    solutions: Solution[];
    products: ProductDetail[];
    categories: ApiCategory[];
    brands: ApiBrand[];
    teamMembers: TeamMember[];
    lowStock: ProductDetail[];
  }): DashboardStats {
    const activeSolutions = payload.solutions.filter(solution => solution.isActive).length;
    const featuredSolutions = payload.solutions.filter(solution => solution.isFeatured).length;
    const activeBrands = payload.brands.filter(brand => brand.isActive).length;
    const activeCategories = payload.categories.filter(category => category.isActive).length;
    const leadershipCount = payload.teamMembers.filter(member => member.isLeadership).length;

    return {
      totalSolutions: payload.solutions.length,
      featuredSolutions,
      activeSolutions,
      totalProducts: payload.products.length,
      lowStockCount: payload.lowStock.length,
      totalBrands: payload.brands.length,
      activeBrands,
      totalCategories: payload.categories.length,
      activeCategories,
      totalTeamMembers: payload.teamMembers.length,
      leadershipCount
    };
  }

  private buildActivity(categories: ApiCategory[], brands: ApiBrand[]): DashboardActivity[] {
    const categoryActivity = categories.map(category => ({
      title: `New category added: ${category.name}`,
      meta: 'Category update',
      createdAt: category.createdAt,
      icon: 'category',
      accent: 'bg-blue-50 text-primary'
    }));

    const brandActivity = brands.map(brand => ({
      title: `Brand onboarded: ${brand.name}`,
      meta: 'Brand update',
      createdAt: brand.createdAt,
      icon: 'verified',
      accent: 'bg-green-50 text-green-600'
    }));

    return [...categoryActivity, ...brandActivity]
      .filter(activity => activity.createdAt)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4);
  }
}
