import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { ProductDetail } from '../../../core/models/entities';

interface CategoryCard {
  name: ProductDetail['category'];
  count: number;
  description: string;
  icon: string;
  brands: string[];
}

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categoryCards: CategoryCard[] = [];
  isLoading = true;
  errorMessage = '';

  private categoryMeta: Record<string, { description: string; icon: string }> = {
    'Business Operations': {
      description: 'ERP and workflow automation suites built to streamline finance, HR, and supply chain operations.',
      icon: 'lan'
    },
    'Infrastructure & Edge': {
      description: 'Edge-ready compute platforms and infrastructure bundles for high-availability workloads.',
      icon: 'cloud_sync'
    },
    Security: {
      description: 'SOC tooling, compliance automation, and threat response platforms for regulated environments.',
      icon: 'shield'
    },
    Networking: {
      description: 'Branch-to-cloud connectivity, SD-WAN, and high-performance networking stacks.',
      icon: 'lan'
    },
    'Data & Storage': {
      description: 'Storage arrays, backup orchestration, and disaster recovery platforms to keep data resilient.',
      icon: 'storage'
    }
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<ProductDetail[]>('/products').subscribe({
      next: data => {
        const categories = Array.from(new Set(data.map(item => item.category)));
        this.categoryCards = categories.map(category => {
          const productsInCategory = data.filter(product => product.category === category);
          const meta = this.categoryMeta[category] ?? {
            description: `Explore curated ${category} solutions built for enterprise performance and reliability.`,
            icon: 'category'
          };
          const brands = Array.from(new Set(productsInCategory.map(product => product.brand))).slice(0, 4);

          return {
            name: category,
            count: productsInCategory.length,
            description: meta.description,
            icon: meta.icon,
            brands
          };
        });
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load categories right now.';
        this.isLoading = false;
      }
    });
  }
}
