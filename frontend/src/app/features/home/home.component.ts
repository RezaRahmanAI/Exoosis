import { Component, OnInit } from '@angular/core';
import { SolutionService } from '../../core/services/solution.service';
import { ProductService } from '../../core/services/product.service';
import { ApiService } from '../../core/services/api.service';
import { CategoryService } from '../../core/services/category.service';
import { RespectedClientService } from '../../core/services/respected-client.service';
import { ApiCategory } from '../../core/models/catalog';
import { Solution, Testimonial, ProductDetail, RespectedClient } from '../../core/models/entities';
import { ApiResponse } from '../../core/models/api-response';
import { environment } from '../../../environments/environment';
import { HeroSectionComponent } from './sections/hero-section.component';
import { RespectedClientsSectionComponent } from './sections/respected-clients-section.component';
import { SolutionsSectionComponent } from './sections/solutions-section.component';
import { PartsAccessoriesSectionComponent } from './sections/parts-accessories-section.component';
import { PeripheralsSectionComponent } from './sections/peripherals-section.component';
// import { OfficeSolutionsSectionComponent } from './sections/office-solutions-section.component';
import { ConsumablesSectionComponent } from './sections/consumables-section.component';
import { TestimonialSectionComponent } from './sections/testimonial-section.component';
import { ExpertsSectionComponent } from './sections/experts-section.component';
import { InsightsSectionComponent } from './sections/insights-section.component';
import { BulkProcurementSectionComponent } from './sections/bulk-procurement-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    RespectedClientsSectionComponent,
    SolutionsSectionComponent,
    PartsAccessoriesSectionComponent,
    PeripheralsSectionComponent,
    // OfficeSolutionsSectionComponent,
    // ConsumablesSectionComponent,
    TestimonialSectionComponent,
    ExpertsSectionComponent,
    InsightsSectionComponent,
    BulkProcurementSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  solutions: Solution[] = [];
  featuredProducts: ProductDetail[] = [];
  categories: any[] = [];
  clients: RespectedClient[] = [];
  laptops = [
    {
      title: 'HP EliteBooks',
      desc: 'Premium performance and military-grade security for mobile professionals.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBYRFvVTDkC_2MUtqYQoeEjOoaPm2S47EwKD37C7vsAcjjhMPDFOdS66VJ9ninPaxNK6zjI0ggYjU_6gV4XOPxtzGKvVee-U66ffOEpq1k685PnDTm4iUB7NEeRuTCvtwwQRJDQ7yfVFP_KFkBXKZeVdumaJ4bK8a3kOcdZPCQMBr92CbJ8O8omrE9QYa4rJrp8RZgLBq5CvAaEoWHR3s6qIHBRFLJevmYwyWsztjJTD4Cz5JR4vsz9HQ_2-EZRCguba-U4Zh09mznz',
      tag: 'Enterprise Class',
      features: ['Wolf Security Integrated', 'Intel vPro Certified'],
    },
    {
      title: 'Dell OptiPlex & Precision',
      desc: 'Highly configurable desktops and professional workstations for intense workloads.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBtXjgTejMqJAR3iHabWtb1menEoqf1MW6XTp1tuHZ90EbKY50yiclXajytgvG53g52kZxEOmLjss5a3eyqvIDwIOFFCPOB1Ow9aSQO_6eWoL5ZuiJfFKopHM0lM-ekxUO2_JGWUdMLNqvzBHZDjpUXufOBm1dE0m-l-ynlkWWQqGZRmx998NroxfSYTYmoyJjPTmgQz4Q-m8dz15a8ATUao8mpssE1kdFXv1uWADopaLUBaEO1OaJEuy2yNhwc0ARIzNBu_S0s-RIY',
      tag: 'Workstations',
      features: ['ISV Certified Hardware', 'Sustainable Design'],
    },
    {
      title: 'Internal Components',
      desc: 'Genuine RAM, SSDs, and processors to keep your existing infrastructure running at peak speed.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCXS-JYhTavj9aLfGjUFwM8-rGIH2WL0vfWgAcZU3IXJ9_cl8DVYz54UACcqb4vnpkz7ePr1ryPsQ9NX18kk4gJZMaWZy_XVDvO7DpI8QQB2c_zKG7c7XPTIJNy0Ag1YozqSs7IDTIyLEERXOT7G4C3SsPkJCU3XBhmq5xam9SR5C151NANA1ae1kUjARoWm6gJ_QBjTBrKKB3m5v8bO-qoU9e4hNFlhHaytUL4FOfkuqQZR4AFoh0I05LNMKqm797m3osrBEcpgLCG',
      tag: 'Parts & Upgrades',
      features: ['Enterprise NVMe SSDs', 'ECC Memory Modules'],
    },
  ];

  officeSolutions = [
    {
      title: 'Epson Solutions',
      icon: 'print',
      desc: 'PrecisionCore technology for high-volume business printing.',
    },
    {
      title: 'HP LaserJets',
      icon: 'local_printshop',
      desc: 'The industry standard for secure, fast, and efficient laser printing.',
    },
    {
      title: 'Document Scanners',
      icon: 'scanner',
      desc: 'High-speed duplex scanning for digital archiving and workflows.',
    },
    {
      title: 'Projectors',
      icon: 'videocam',
      desc: '4K and High-Lumen projectors for boardrooms and large venues.',
    },
  ];

  consumables = [
    {
      name: 'HP LaserJet',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuApUPzN6Rf4iMQmOxCus9Aqg9Hpk2hGoP314eOKKdFpj81VyhGaMirwSnIW6ZnsVQTLhubUmfBAW9Q-4s6BCLlWbDi8JMbkEurYlm-55YIeQv7Hk9-OkHbgKZ8UdRD2zy85tSD5hl9IJZLUFXXUdEMbKYkamxSlJByANbVSu2-aOwiclSbPzJVV_Qr-Lr53Q-wb9GGoNWOst_J9R8e3s8X-zO7mqDSCj21T4PaJXsqVe-Iz6iGP6c1FPXyOXbbLMDTnK3gTcljcao9R',
    },
    {
      name: 'Brother Ink',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCf3STESFT9tNNn_oY4EBRTeaQx3hMeHsm6AdS4iK6mCIwP5yk3axu35TrFe0J3xcw5h0aN-th8CZZZEqmrw7mtKBIe_9vYRF1HBNAkVgcI2-2H5fqPTIVk26y2CbCPWpjb9FHUpTyHHoUz2LP_ALDveW5wpJ2XKsiJhszm0SjVqkynatK5OtHQPe2xsiUN9XR0re37IJnYZm0gvaJmlf-a9ONedrHo-ijJEbgmu_h9GwHxOJM8QnQC9Kxe9W0Qnj2JMNfLqP-CAVsB',
    },
    {
      name: 'NCR Papers',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCoCMq04dZGH0LbR0wYzY8II__eQShlYurBIIkvC_ISr4HC3ADkq1t9IyT_nFzXPcVQvrC5wxdSSLQmBaWB0t69PoKZmN5KWf6TOnKcQA7nNZndEwnEzinUOIU-y9xRDDHQ0JkmPHcuoXDHjDilYBHNZqZLZW57pCf5nzGL5yqNNBMqaY4shWvoOkwi4aWnPt1uGntL-ewNx02xi82JxNwahQ4JEmezb542rkRKShUu1qShszZK_TBolJqQ_iNwRJ6uaHoQUgIHhKTP',
    },
    {
      name: 'Epson EcoTank',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDdJC4YFGHixGWcplc0-4jkqRtnj8FL_uRmMhURuAGVyWpJprMLl6ARC_zLj1sCYzqJh3LrPyO9MMZZfDIhSfMIFaKa2ndZVZuoS1EmtSwECXOlpHwTa647Z84IKgKwD6rj8LEP9t_LEB36EEFT3dOenqxFujGUtFpW205mm2sWsVjdYNSiEoxqFJt3GjgJr2kpATRK--vkK5j-tvt51xRZGOgetsH7Hk6QGB_wxTRSV6qyDyrADO67-JQaq_OewZE__xhuPI5hFmto',
    },
  ];

  testimonials: Testimonial[] = [];

  private readonly fallbackClients: RespectedClient[] = [
    {
      id: '1',
      name: 'Pubali Bank',
      logoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDjwsIA0cEQU4-BnWhf7KCg0B92gAneQjMhOvvFplkDN85Sx5n_vZNUUrA4u-PyE6iO88T04KpbJf44_DeEtn08ru3O_QnyDbp59wg-YfeTtkpODsKzS2W361f6zWHNXF2L0JkrIEoLBdBBgXAW-fAr1VRnzJVb1YDAJKFFWD7K6jRROZs93qcq1KFZMglwTUCZx8Tz6qDDhWMCr48TwUaqidSdwEBaGK8tqM7s62AyE2-EMCjyb4Zc6BOQySv86JjRCwKOfv11oQVk',
      isActive: true,
    },
    {
      id: '2',
      name: 'NCC Bank',
      logoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBKHxOUKPcz7zkxPVwKYpv6au1nTVeUc97cUsafJnl59rd8AL0Lj8rLKseP1NsxOWwPLN0s9xcataahJDBCuJmzwPQP7XGy4127_kXsg27mF5UwsWcHQls6L-qI2TfFTaMq1kB4CDpP2ZNLEIwZ-hXTvBnwwPizfKKbXs7B-nupizYqEsX1AWqkHxd6ReYFKd9rBidiyMtB_Q60qHq-SmakP1n8ZCRSGpDa2AOuvn4xvrOzVDXE7pfxpZ6OhC-mBa0ni161zO25jAWC',
      isActive: true,
    },
    {
      id: '3',
      name: 'Incepta Pharma',
      logoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD8qDG66edMBzTaLSYAvHpK2dp1ZVMiLGINwEe1D-BRkJyIFQb3-s3FtarZ_Doq2sdjM3CzSPP0KRcK4yKZ_-o_ZC8i0yMyWFcfXSgBBPgLxJTMgjpq1PAcEwyNP8GLjHK7uHnHey1OJKhyjO--BBclGR6B_beysFNjSyvZsa8LgChGufY_uOdms6iMNOz61mPEJGRbwNsMKyv-GVMD8AuUNc_fTD6fqeLclyhYg-YXh0pwvZ3Jmlyaqiswhh6J3LMWVVzka9lidDu9',
      isActive: true,
    },
    {
      id: '4',
      name: 'Pacific Pharma',
      logoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA0nZ87eSEivNfEdOWYkAxMxHF6-jgBoRWRZJKUuR-yu-NkO9Obx4GPBSimwzTDiTDDlcPRCZP-qh4fwHSqHAkMhxJI9JlvsozN0yzJsANd9O2oZCAtHINEbaSQl5z59V97tn7qWPuJN9Xg1n1n92Ss2wYlgvoh1P-c3L7R3d_JkOgLoAM7YPzjbCVN2J3q54HfqBSJ975Yp2cJGCliDwayw-MD75-qPmmtwxxk4GMfR8vn3_I9LDVSbR55t9I7TIFSFmk_3atJcuhq',
      isActive: true,
    },
    {
      id: '5',
      name: 'Bangladesh Eye Hospital',
      logoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAZIkU8BlCJEySHIdv-thMIr145UO65KrHQKxILx_V11t5vNz2iWwA9pMZwuoFLy7k-2vzgPYpBJ2Kxq-mifx09lmOznRrRDLoxcxFriuATrTetvNhX4P1yGAW3iPjFUeW_TMxXYleTkyiGfZ87wzdKF-Yvdt28PgSFSsHRZEbAeW46v7tZGN3Suh2emvkRQuUMcw1POfWOZ3TuyvRNeopYp4xPTpJtbPGDcL9b89a-ek3bCz52R8Z78VCZNBRy6WoDANtXR8vvpUoo',
      isActive: true,
    },
    {
      id: '6',
      name: 'Padma Bank',
      logoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ5XbVKhHMwf_XcCCzWfyaE7ESOIAMbvDy0x1p87scQYbSbLzS8ycMuEAnZebH2pTvCyZHkfTJnIq9U5tlPB29miwfGRBAq2naLob2sd8Ecfc_oMrcA2rfcsPjzaRnVpuHjdP9hDUpNLt--YwHbveeU4PpErSBdEDKr4bl-hL8kJ2HqOs31exmMnjv7PuIz-kZTUdXRjFwf5mdOwyI1vqO7RHWZRX2br86EJvR6kMS_rjlZ7X84rUnM6MW6gZNRgyXIJAAfQbcBLVt',
      isActive: true,
    },
    {
      id: '7',
      name: 'Bangladesh Police',
      logoUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAt8SCYniong0KnxDtNACA_ohHxtLEcSZ09l_y8rGVVqdDfSfBCaj6BmOgMZgKvGGmkhZ7z3iqMint8lv4hMhMY21fOG9BqreGhqknsrCJeqiH7Ef7kcV0nMH6Zsr2_2yD01774uyCDYPAhU9e7oofEw8lfsedHRroSt9WnQTwm9VcKXb1y4uw8duGAKBx9nmIFW0nUc4Irq5bS9vJKYV1bbQk9ShLlrHFXzdXCurIIrv8I8IyBxNYfwniX0EtDvuAjhxfnJo2N0kTY',
      isActive: true,
    },
  ];

  insights = [
    {
      category: 'Infrastructure',
      title: 'Building Resilient Data Centers in High-Humidity Environments',
      desc: "How advanced cooling systems and proper rack design can prevent hardware failure in Bangladesh's climate.",
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCxKoVT8Bn7wZKE_sMh38GXTKWKm4rIQZqCOfmXU3UlXHRY4JpdESQleVRsg9ZifHGGsDI-JLCa4mWtYMNw0MgkJja40GSJP8nf7vQ7prgm2VkYZWFnSKU5rk_LG4Di99d2sgRGiuUGxdTMsLIAVppE_e0--R8I4y3YeW7PNovVGKnV_BXh3enTlv9W-TFu2FCM3UUbKAacbek9V_qbMBjYSnNMguO4lm5e21mgOTPawCVALQ3C_KqEhDgXM482n9D_Rn2Ijedzs0VU',
      author: 'Tanvir Hasan',
      role: 'Infrastructure Lead',
      date: 'Oct 24, 2023',
    },
    {
      category: 'Cybersecurity',
      title: 'The Rise of Ransomware: Protecting Corporate Assets in 2024',
      desc: 'Strategies for implementing Zero Trust architecture across distributed enterprise networks.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCergsETW_h3TE1Ca4Ig1XUgjmE4P9-xRw3N3vsfB025hkDt0HUW6RdXn9MIyjZ23xcyUzk3X-dlHFG04nsZfhuig8ef8A5Y_25cprGmeqZdebOZZBd-d4Q6F_x_Knit3U9c51qrQRCyAMCaRUP1FfEcFJ5gv44fDlZ0CV0UuykIOTgd5vCqwDQIJ4yAK7jYk5u7PYFlqa_oGLt3d1KihFjeHk-92b-Z__oOIGvQUQmFgUtfSL3fZg7L4QdTBp1gxTjtTdArLiNoDAR',
      author: 'Sarah Rahman',
      role: 'Security Analyst',
      date: 'Nov 12, 2023',
    },
    {
      category: 'Cloud',
      title: 'Migrating Legacy Banking Systems to Hybrid Cloud Infrastructure',
      desc: 'A step-by-step guide to modernizing financial applications while maintaining compliance and uptime.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB9ds4I0I4mBDNW-_OMkYi002yCDZOcWB8oEG3B1MmT0R6Vtg3sVfgbq_Ym4EPly47jIoRZhgbdzkzgFtm6bGAbTy4f4qg_fjOGi-uw3X1r1b1nCHhTr0IrzsOwb2QLJ_liTFCDhtQMBmcPdK9W5DG1DKLYBVtb-TDLfHSwPVeXe4AW5cOoyPUkKqCOD2oPc-z0ZliKvNVs9xC3tsdTuWaNgEYh_DraGkozhwgn6LUa_YJgFyOi22HI1UT7EYNoUNKQX4Sh-d3SCp6P',
      author: 'Imran Khan',
      role: 'Cloud Architect',
      date: 'Dec 05, 2023',
    },
  ];

  constructor(
    private categoryService: CategoryService,
    private api: ApiService,
    private solutionService: SolutionService,
    private productService: ProductService,
    private respectedClientService: RespectedClientService,
  ) {}

  ngOnInit() {
    this.solutionService.getSolutions().subscribe((data) => {
      // Display first 3 solutions
      this.solutions = data.slice(0, 3);
    });

    this.productService.getProducts({ isFeatured: true }).subscribe((data) => {
      this.featuredProducts = data;
    });

    this.api.get<ApiResponse<Testimonial[]>>('/testimonials').subscribe({
      next: (response) => {
        this.testimonials = response.data || [];
      },
      error: () => {
        this.testimonials = [];
      },
    });

    if (environment.useMockData) {
      this.clients = this.fallbackClients;
    } else {
      this.respectedClientService.getClients().subscribe({
        next: (data) => {
          this.clients = data;
        },
        error: () => {
          this.clients = this.fallbackClients;
        },
      });
    }

    this.categoryService.getCategories().subscribe((data: ApiCategory[]) => {
      this.categories = data.filter((c: ApiCategory) => c.isActive).slice(0, 4);
    });

  }
}
