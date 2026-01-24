import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Solution, Partner, Testimonial } from '../../core/models/entities';
import { HeroSectionComponent } from './sections/hero-section.component';
import { PartnersSectionComponent } from './sections/partners-section.component';
import { SolutionsSectionComponent } from './sections/solutions-section.component';
import { PartsAccessoriesSectionComponent } from './sections/parts-accessories-section.component';
import { PeripheralsSectionComponent } from './sections/peripherals-section.component';
import { OfficeSolutionsSectionComponent } from './sections/office-solutions-section.component';
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
    PartnersSectionComponent,
    SolutionsSectionComponent,
    PartsAccessoriesSectionComponent,
    PeripheralsSectionComponent,
    OfficeSolutionsSectionComponent,
    // ConsumablesSectionComponent,
    TestimonialSectionComponent,
    ExpertsSectionComponent,
    InsightsSectionComponent,
    BulkProcurementSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  solutions: Solution[] = [];
  logos: Partner[] = [];
  categories = [
    { icon: 'monitor', name: 'Monitors', desc: '4K, Curved & Ultrawide' },
    { icon: 'hub', name: 'Docking Stations', desc: 'Thunderbolt 4 & USB-C' },
    { icon: 'keyboard', name: 'Input Devices', desc: 'Ergonomic Keyboards & Mice' },
    { icon: 'lan', name: 'Networking', desc: 'Switches, Cables & Routers' }
  ];

  laptops = [
    {
      title: 'HP EliteBooks',
      desc: 'Premium performance and military-grade security for mobile professionals.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYRFvVTDkC_2MUtqYQoeEjOoaPm2S47EwKD37C7vsAcjjhMPDFOdS66VJ9ninPaxNK6zjI0ggYjU_6gV4XOPxtzGKvVee-U66ffOEpq1k685PnDTm4iUB7NEeRuTCvtwwQRJDQ7yfVFP_KFkBXKZeVdumaJ4bK8a3kOcdZPCQMBr92CbJ8O8omrE9QYa4rJrp8RZgLBq5CvAaEoWHR3s6qIHBRFLJevmYwyWsztjJTD4Cz5JR4vsz9HQ_2-EZRCguba-U4Zh09mznz',
      tag: 'Enterprise Class',
      features: ['Wolf Security Integrated', 'Intel vPro Certified']
    },
    {
      title: 'Dell OptiPlex & Precision',
      desc: 'Highly configurable desktops and professional workstations for intense workloads.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtXjgTejMqJAR3iHabWtb1menEoqf1MW6XTp1tuHZ90EbKY50yiclXajytgvG53g52kZxEOmLjss5a3eyqvIDwIOFFCPOB1Ow9aSQO_6eWoL5ZuiJfFKopHM0lM-ekxUO2_JGWUdMLNqvzBHZDjpUXufOBm1dE0m-l-ynlkWWQqGZRmx998NroxfSYTYmoyJjPTmgQz4Q-m8dz15a8ATUao8mpssE1kdFXv1uWADopaLUBaEO1OaJEuy2yNhwc0ARIzNBu_S0s-RIY',
      tag: 'Workstations',
      features: ['ISV Certified Hardware', 'Sustainable Design']
    },
    {
      title: 'Internal Components',
      desc: 'Genuine RAM, SSDs, and processors to keep your existing infrastructure running at peak speed.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXS-JYhTavj9aLfGjUFwM8-rGIH2WL0vfWgAcZU3IXJ9_cl8DVYz54UACcqb4vnpkz7ePr1ryPsQ9NX18kk4gJZMaWZy_XVDvO7DpI8QQB2c_zKG7c7XPTIJNy0Ag1YozqSs7IDTIyLEERXOT7G4C3SsPkJCU3XBhmq5xam9SR5C151NANA1ae1kUjARoWm6gJ_QBjTBrKKB3m5v8bO-qoU9e4hNFlhHaytUL4FOfkuqQZR4AFoh0I05LNMKqm797m3osrBEcpgLCG',
      tag: 'Parts & Upgrades',
      features: ['Enterprise NVMe SSDs', 'ECC Memory Modules']
    }
  ];

  officeSolutions = [
    { title: 'Epson Solutions', icon: 'print', desc: 'PrecisionCore technology for high-volume business printing.' },
    { title: 'HP LaserJets', icon: 'local_printshop', desc: 'The industry standard for secure, fast, and efficient laser printing.' },
    { title: 'Document Scanners', icon: 'scanner', desc: 'High-speed duplex scanning for digital archiving and workflows.' },
    { title: 'Projectors', icon: 'videocam', desc: '4K and High-Lumen projectors for boardrooms and large venues.' }
  ];

  consumables = [
    { name: 'HP LaserJet', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApUPzN6Rf4iMQmOxCus9Aqg9Hpk2hGoP314eOKKdFpj81VyhGaMirwSnIW6ZnsVQTLhubUmfBAW9Q-4s6BCLlWbDi8JMbkEurYlm-55YIeQv7Hk9-OkHbgKZ8UdRD2zy85tSD5hl9IJZLUFXXUdEMbKYkamxSlJByANbVSu2-aOwiclSbPzJVV_Qr-Lr53Q-wb9GGoNWOst_J9R8e3s8X-zO7mqDSCj21T4PaJXsqVe-Iz6iGP6c1FPXyOXbbLMDTnK3gTcljcao9R' },
    { name: 'Brother Ink', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf3STESFT9tNNn_oY4EBRTeaQx3hMeHsm6AdS4iK6mCIwP5yk3axu35TrFe0J3xcw5h0aN-th8CZZZEqmrw7mtKBIe_9vYRF1HBNAkVgcI2-2H5fqPTIVk26y2CbCPWpjb9FHUpTyHHoUz2LP_ALDveW5wpJ2XKsiJhszm0SjVqkynatK5OtHQPe2xsiUN9XR0re37IJnYZm0gvaJmlf-a9ONedrHo-ijJEbgmu_h9GwHxOJM8QnQC9Kxe9W0Qnj2JMNfLqP-CAVsB' },
    { name: 'NCR Papers', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoCMq04dZGH0LbR0wYzY8II__eQShlYurBIIkvC_ISr4HC3ADkq1t9IyT_nFzXPcVQvrC5wxdSSLQmBaWB0t69PoKZmN5KWf6TOnKcQA7nNZndEwnEzinUOIU-y9xRDDHQ0JkmPHcuoXDHjDilYBHNZqZLZW57pCf5nzGL5yqNNBMqaY4shWvoOkwi4aWnPt1uGntL-ewNx02xi82JxNwahQ4JEmezb542rkRKShUu1qShszZK_TBolJqQ_iNwRJ6uaHoQUgIHhKTP' },
    { name: 'Epson EcoTank', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdJC4YFGHixGWcplc0-4jkqRtnj8FL_uRmMhURuAGVyWpJprMLl6ARC_zLj1sCYzqJh3LrPyO9MMZZfDIhSfMIFaKa2ndZVZuoS1EmtSwECXOlpHwTa647Z84IKgKwD6rj8LEP9t_LEB36EEFT3dOenqxFujGUtFpW205mm2sWsVjdYNSiEoxqFJt3GjgJr2kpATRK--vkK5j-tvt51xRZGOgetsH7Hk6QGB_wxTRSV6qyDyrADO67-JQaq_OewZE__xhuPI5hFmto' }
  ];

  testimonials: Testimonial[] = [];

  insights = [
    {
      category: 'Infrastructure',
      title: 'Building Resilient Data Centers in High-Humidity Environments',
      desc: 'How advanced cooling systems and proper rack design can prevent hardware failure in Bangladesh\'s climate.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxKoVT8Bn7wZKE_sMh38GXTKWKm4rIQZqCOfmXU3UlXHRY4JpdESQleVRsg9ZifHGGsDI-JLCa4mWtYMNw0MgkJja40GSJP8nf7vQ7prgm2VkYZWFnSKU5rk_LG4Di99d2sgRGiuUGxdTMsLIAVppE_e0--R8I4y3YeW7PNovVGKnV_BXh3enTlv9W-TFu2FCM3UUbKAacbek9V_qbMBjYSnNMguO4lm5e21mgOTPawCVALQ3C_KqEhDgXM482n9D_Rn2Ijedzs0VU',
      author: 'Tanvir Hasan',
      role: 'Infrastructure Lead',
      date: 'Oct 24, 2023'
    },
    {
      category: 'Cybersecurity',
      title: 'The Rise of Ransomware: Protecting Corporate Assets in 2024',
      desc: 'Strategies for implementing Zero Trust architecture across distributed enterprise networks.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCergsETW_h3TE1Ca4Ig1XUgjmE4P9-xRw3N3vsfB025hkDt0HUW6RdXn9MIyjZ23xcyUzk3X-dlHFG04nsZfhuig8ef8A5Y_25cprGmeqZdebOZZBd-d4Q6F_x_Knit3U9c51qrQRCyAMCaRUP1FfEcFJ5gv44fDlZ0CV0UuykIOTgd5vCqwDQIJ4yAK7jYk5u7PYFlqa_oGLt3d1KihFjeHk-92b-Z__oOIGvQUQmFgUtfSL3fZg7L4QdTBp1gxTjtTdArLiNoDAR',
      author: 'Sarah Rahman',
      role: 'Security Analyst',
      date: 'Nov 12, 2023'
    },
    {
      category: 'Cloud',
      title: 'Migrating Legacy Banking Systems to Hybrid Cloud Infrastructure',
      desc: 'A step-by-step guide to modernizing financial applications while maintaining compliance and uptime.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9ds4I0I4mBDNW-_OMkYi002yCDZOcWB8oEG3B1MmT0R6Vtg3sVfgbq_Ym4EPly47jIoRZhgbdzkzgFtm6bGAbTy4f4qg_fjOGi-uw3X1r1b1nCHhTr0IrzsOwb2QLJ_liTFCDhtQMBmcPdK9W5DG1DKLYBVtb-TDLfHSwPVeXe4AW5cOoyPUkKqCOD2oPc-z0ZliKvNVs9xC3tsdTuWaNgEYh_DraGkozhwgn6LUa_YJgFyOi22HI1UT7EYNoUNKQX4Sh-d3SCp6P',
      author: 'Imran Khan',
      role: 'Cloud Architect',
      date: 'Dec 05, 2023'
    }
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<Solution[]>('/solutions').subscribe(data => this.solutions = data.slice(0, 3));
    this.api.get<Partner[]>('/partners').subscribe(data => this.logos = data);
    this.api.get<Testimonial[]>('/testimonials').subscribe(data => {
      this.testimonials = data;
    });
  }
}
