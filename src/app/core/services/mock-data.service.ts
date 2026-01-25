import { InMemoryDbService } from 'angular-in-memory-web-api';
import {
  Solution,
  Job,
  TeamMember,
  Partner,
  Testimonial,
  ProductDetail,
  EnterpriseSoftware,
  JobApplicationPayload,
  PeripheralCategory,
  LaptopProduct,
  OfficeSolution,
  ConsumableItem,
  Insight,
  MissionStatement,
  CompanyValue,
  ClientLogo
} from '../models/entities';

export class MockDataService implements InMemoryDbService {
  createDb() {
    const solutions: Solution[] = [
      {
        id: 1,
        title: 'Enterprise Electronics Supply',
        desc: 'High-performance laptops, desktops, and servers tailored for business environments. From branch offices to data centers, we deliver reliable electronics at scale.',
        icon: 'devices',
        category: 'Electronics',
        brands: ['HP Enterprise', 'Dell', 'Lenovo', 'Asus'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcZ81cRXiCLudcPpC1mKykToYYsqrjORX7BVyLuxLVdnpvEvluhCsmkrVJWHQBQBEfaGtUxiDhxo_NTJW0uMseVvwBb2zobviXqGfjW57ry7oXauQjeJUGLhDrZGz3eLAlzjtXglZiwkbePG3oTMoGYcT6KafGzIIDuHSLSCLG3YCVeGEK8PBCAd6ZnpSGu61IQc1pxn-9-TLP2qQRygeq9AR2pC4gZlC_pRSlUTPLO2dujD83ko844Hed7CAJuwWfFiwWgekeXaJ5'
      },
      {
        id: 2,
        title: 'Custom Software Delivery',
        desc: 'Bespoke applications designed around your business processes, integrations, and customer journeys with agile delivery and long-term support.',
        icon: 'code',
        category: 'Custom Software',
        brands: ['ERP & POS Systems', 'Mobile Apps', 'System Integration'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArw2sQmjraHOEloQVwXPxePym8QPfwAnuJc0WbXq7TVmm_wETqwbkhx-DTWjNMwE8EQhQA9cLbGjAbMpRaGVEEgzCA0l4R318PjMU9rlvtFVsiEt2tq3tWjdmol2i8MRTn-I4GE0hdNvE2OAitKcHnOrWDmtKoji6q6GewK_mFuZ1Pi3wEAaEO1Ft6VeGgTtCwgktY_1EKuE2uaouK5Qp0YHIBWbDKR__ZEV3rHjX9_Baj4Nt1gFPiBgf3rHJ-yZ9uGxzn7qpT0v_3'
      },
      {
        id: 3,
        title: 'Networking & Connectivity',
        desc: 'Robust connectivity solutions including switches, routers, and wireless access points designed for secure, high-availability enterprise communication.',
        icon: 'router',
        category: 'Networking',
        brands: ['Cisco', 'Ruijie', 'Ruckus'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCergsETW_h3TE1Ca4Ig1XUgjmE4P9-xRw3N3vsfB025hkDt0HUW6RdXn9MIyjZ23xcyUzk3X-dlHFG04nsZfhuig8ef8A5Y_25cprGmeqZdebOZZBd-d4Q6F_x_Knit3U9c51qrQRCyAMCaRUP1FfEcFJ5gv44fDlZ0CV0UuykIOTgd5vCqwDQIJ4yAK7jYk5u7PYFlqa_oGLt3d1KihFjeHk-92b-Z__oOIGvQUQmFgUtfSL3fZg7L4QdTBp1gxTjtTdArLiNoDAR'
      },
      {
        id: 4,
        title: 'Security & Surveillance',
        desc: 'Comprehensive security infrastructure including CCTV, biometric access control, and smart monitoring systems for facility safety.',
        icon: 'security',
        category: 'Security',
        brands: ['Hikvision', 'Dahua', 'ZKTeco'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCALu8AoJ9x6w84v4gGjTIqxZn3XaHRJvvb2H62xHgwaFNY67uCYo8-F3vpjvtmAJ3tQI6bCvwwnkPA-PjmRx9Z_SW_q9J2EwOLd7xX_EG8PvCkqH8qVkqeBywW-cvPdoxkBAud1_2E_YoXfYjGy5EjdH99kQVjwUEGaLf8YCercz1rg9mgjjdwnAfMQVm9UWn9624aIUaJk7W5lRi6Id_y9Gy2GOB0aB32VtdDJULCf-TWgnnP_J75YOxujHfhkDO4HHOuJRGMSoUf'
      }
    ];

    const jobs: Job[] = [
      { 
        id: 1, 
        title: 'Network Engineer', 
        location: 'Dhaka', 
        type: 'Full-time', 
        typeIcon: 'schedule',
        category: 'Engineering',
        team: 'Infrastructure Team',
        description: 'As a Network Engineer at EXOSISTECH, you will be part of a high-performance infrastructure team dedicated to maintaining and optimizing our mission-critical networks.',
        responsibilities: [
          'Maintain and configure Cisco routers and switches',
          'Monitor network performance and troubleshoot issues',
          'Implement security protocols and firewalls'
        ],
        requirements: [
          'Bachelor’s degree in CS or related field',
          'CCNA or CCNP Certification preferred',
          '3+ years of experience'
        ],
        salary: 'Competitive',
        datePosted: 'Jan 24, 2026'
      },
      { 
        id: 2, 
        title: 'Sales Account Manager', 
        location: 'Dhaka', 
        type: 'Hybrid', 
        typeIcon: 'work_history',
        category: 'Sales',
        team: 'Corporate Sales',
        description: 'We are seeking a results-driven Sales Account Manager to drive growth and manage relationships with our key enterprise clients.',
        responsibilities: [
          'Identify new business opportunities',
          'Maintain strong client relationships',
          'Prepare and present sales proposals'
        ],
        requirements: [
          'Proven experience in enterprise sales',
          'Excellent communication skills',
          'Understanding of IT hardware market'
        ],
        salary: 'Negotiable',
        datePosted: 'Jan 22, 2026'
      }
    ];

    const team: TeamMember[] = [
      {
        id: 1,
        name: 'Ahmed Sharif',
        role: 'Chief Executive Officer',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgcXQhWdaWqnwjj43imXNB9RJfmebt_4dvUXQm7ccTnGvhmaruRI0iY592w9XpFcPCn4y-T_hFKWgewlAqtbKiuPieoZ5icwpjvCuZY1ms3GqgKigFcBSmSFgWcEI3cs910QQaPshdKMXbMPsimH3n4b7DAGhwgGujpkyQdyoFUIO0R7YWypyZdqJpT5gHi_l-vxopOz1MGFDMg7dAa36v0EVHYtkbmhnrPL4AorQnBXri99mtkt-n419VGsbiYuN7KEpSvEdCSE2X',
        quote: 'Our goal is to redefine how enterprises interact with technology.',
        bio: 'With over two decades of experience in global technology distribution and strategic consulting.',
        isLeadership: true
      },
      {
        id: 2,
        name: 'Mahmudul Hasan',
        role: 'Chief Technology Officer',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-Sb8CDfYjsek2B8iJJ2q74qbXHlLITETJ4WEU7KfEpso-c-U3yp0nYoyC2pR7ZPuAH5xMF34YRgr753-aWUYoNi5ooowc4JyFpWH4ewElOw17KwPO5bo0dsrPiwRZR4z64_X_lYk5QiiroKuJPQxMLOWyLwlFDu4maJhVmUY8XvOdH9xCAjjDj1kgTShE-_SP5qr1UFgfottVHE4REV-w170stuTSylD0KXJlEyvRkWpf5OHMFg0Xh1bEdJUq_Uo3U9T-RF3EYDcx',
        quote: 'Innovation is driven by practical application of complexity.',
        bio: 'Mahmudul oversees the technical roadmap and solution architecture at EXOSISTECH.',
        isLeadership: true
      }
    ];

    const partners: Partner[] = [
      { id: 1, name: 'Pubali Bank', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjwsIA0cEQU4-BnWhf7KCg0B92gAneQjMhOvvFplkDN85Sx5n_vZNUUrA4u-PyE6iO88T04KpbJf44_DeEtn08ru3O_QnyDbp59wg-YfeTtkpODsKzS2W361f6zWHNXF2L0JkrIEoLBdBBgXAW-fAr1VRnzJVb1YDAJKFFWD7K6jRROZs93qcq1KFZMglwTUCZx8Tz6qDDhWMCr48TwUaqidSdwEBaGK8tqM7s62AyE2-EMCjyb4Zc6BOQySv86JjRCwKOfv11oQVk' },
      { id: 2, name: 'NCC Bank', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKHxOUKPcz7zkxPVwKYpv6au1nTVeUc97cUsafJnl59rd8AL0Lj8rLKseP1NsxOWwPLN0s9xcataahJDBCuJmzwPQP7XGy4127_kXsg27mF5UwsWcHQls6L-qI2TfFTaMq1kB4CDpP2ZNLEIwZ-hXTvBnwwPizfKKbXs7B-nupizYqEsX1AWqkHxd6ReYFKd9rBidiyMtB_Q60qHq-SmakP1n8ZCRSGpDa2AOuvn4xvrOzVDXE7pfxpZ6OhC-mBa0ni161zO25jAWC' }
    ];

    const testimonials: Testimonial[] = [
      {
        id: 1,
        quote: 'We engaged EXOSISTECH to modernize our entire banking network security. Their professionalism, access to top-tier hardware, and post-deployment support have been exemplary.',
        author: 'Rahim Ahmed',
        role: 'Chief Technology Officer',
        company: 'Jamuna Future Tech Group',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvOFJbtXss0-oOURmaN1XCNQ5v3AnbTlbAzq45HxpDt2bLlHmFJvFRP08mC7jebApLqIa5LeuXEprsCCfgmTIQQT5mV7m3k8zT-FSSo8Wf7R2b98lk3irtXZdM5xVN2HLaH7Rx68cFE5wenKrf2VtrPoCgJfT-wKs8v2ApTlSjzuPhsGLuw7pP395_VBJkS7CoW5sWG7VQRQ8XGugo5Mdj2Ul1bc0oVahkLkIYG8tnEKOIfYlQq3uI7_ftO1P_FRCWxpq5gJ85M7hP'
      },
      {
        id: 2,
        quote: 'EXOSISTECH delivered a seamless data center refresh with zero downtime. Their team handled every detail from planning to implementation.',
        author: 'Shirin Akter',
        role: 'Head of Infrastructure',
        company: 'Metro Logistics Ltd.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgcXQhWdaWqnwjj43imXNB9RJfmebt_4dvUXQm7ccTnGvhmaruRI0iY592w9XpFcPCn4y-T_hFKWgewlAqtbKiuPieoZ5icwpjvCuZY1ms3GqgKigFcBSmSFgWcEI3cs910QQaPshdKMXbMPsimH3n4b7DAGhwgGujpkyQdyoFUIO0R7YWypyZdqJpT5gHi_l-vxopOz1MGFDMg7dAa36v0EVHYtkbmhnrPL4AorQnBXri99mtkt-n419VGsbiYuN7KEpSvEdCSE2X'
      },
      {
        id: 3,
        quote: 'From procurement to deployment, EXOSISTECH acted as a trusted advisor. Our branch offices now operate with faster, more secure connectivity.',
        author: 'Imtiaz Chowdhury',
        role: 'Director of Operations',
        company: 'Eastern Microfinance',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-Sb8CDfYjsek2B8iJJ2q74qbXHlLITETJ4WEU7KfEpso-c-U3yp0nYoyC2pR7ZPuAH5xMF34YRgr753-aWUYoNi5ooowc4JyFpWH4ewElOw17KwPO5bo0dsrPiwRZR4z64_X_lYk5QiiroKuJPQxMLOWyLwlFDu4maJhVmUY8XvOdH9xCAjjDj1kgTShE-_SP5qr1UFgfottVHE4REV-w170stuTSylD0KXJlEyvRkWpf5OHMFg0Xh1bEdJUq_Uo3U9T-RF3EYDcx'
      }
    ];

    const products: ProductDetail[] = [
      {
        id: 'exo-erp-suite',
        name: 'Exoosis Custom ERP Suite',
        category: 'Business Operations',
        summary: 'A configurable ERP platform tailored to your finance, supply chain, HR, and compliance workflows with API-first automation.',
        highlights: [
          'Workflow engines adapted to your approval chains',
          'Role-based dashboards for every business unit',
          'Integration-ready modules for finance, HR, and inventory'
        ],
        integrations: ['SAP', 'Oracle Netsuite', 'Salesforce', 'Microsoft Dynamics'],
        specs: [
          { label: 'Deployment', value: 'Hybrid, Private Cloud, On-Prem' },
          { label: 'Customization', value: 'Role-based UI + workflow builder' },
          { label: 'SLA', value: '99.95% uptime' },
          { label: 'Compliance', value: 'ISO 27001, SOC 2 Type II' }
        ],
        pricingTiers: [
          { name: 'Growth', description: 'Core modules and onboarding support.', monthlyCost: '$1,200 / month' },
          { name: 'Scale', description: 'Advanced automation, API quotas, and analytics.', monthlyCost: '$2,800 / month' },
          { name: 'Enterprise', description: 'Custom workflows, premium SLA, dedicated CSM.', monthlyCost: 'Custom' }
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9jZ1Ncg0cRrJH7GfVjbg4Q-6DLW3l1o-mxb6amOeSvZPQDCq7aT66a1D3ey4XgkKx6rT-7G1dW9UOyy5eOCAfE3xvvUS3BEp4rLKBbQLef5UIF1ZMX-Vab4gHhL0X2_z3PUxewTTWQ4mDmXTaFoR7Z8RV2S_Sr9ZbEY87HBqzwh0bP_Mqp1FuoN29d4U7m6LJYHdR6BkiO0qXW49XB5TB3Db8tzzn5lSw8B-evA5gQwP3k_VXdnTQc8oGHEMbxyL8jS7u'
      },
      {
        id: 'exo-edge-platform',
        name: 'Exoosis Digital Experience Platform',
        category: 'Custom Experience',
        summary: 'A secure, low-latency platform that powers customer-facing apps, portals, and IoT workflows for real-time engagement.',
        highlights: [
          'Composable services for web and mobile apps',
          'Predictive workload scaling',
          'Unified monitoring across distributed channels'
        ],
        integrations: ['Kubernetes', 'Azure Arc', 'VMWare Tanzu', 'AWS IoT'],
        specs: [
          { label: 'Latency', value: '< 20 ms average' },
          { label: 'Service Nodes', value: 'Up to 2,000 per cluster' },
          { label: 'Observability', value: 'OpenTelemetry + Prometheus' },
          { label: 'Data Encryption', value: 'AES-256 at rest and in transit' }
        ],
        pricingTiers: [
          { name: 'Launch', description: 'Starter bundle for core digital touchpoints.', monthlyCost: '$950 / month' },
          { name: 'Accelerate', description: 'Multi-region deployment plus SOC monitoring.', monthlyCost: '$2,100 / month' },
          { name: 'Enterprise', description: 'Custom SLAs and dedicated architects.', monthlyCost: 'Custom' }
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAENrHBI8vO5kXOH8lO-4xFnTg4NVZfkJok8R48lA-4WTB7J2UWM61CFxgEEhG_0nQGgxE9QOjMJhT7jG_w0Dgq0AHjYvN5kWJmVQmJ1fmf0eJm5cY4FKcY42hVcq41MMD3ez18iRHy2jg2rZ0uOM34iEPO5O_zVrhK0Uel3pw4dKgiRRt7BriN4wv9AXf_s4z6JMRgZ7x4yXKrJhjTeQpFp5tDYoGRdZ-30x0AXKaGD0ExoU'
      }
    ];

    const enterpriseSoftware: EnterpriseSoftware[] = [
      {
        id: 'enterprise-command-center',
        name: 'Custom Software Command Center',
        tagline: 'A tailored delivery hub for regulated enterprises.',
        description: 'Align product teams, architecture, and delivery into a secure command center that unifies discovery, build, and lifecycle support across custom applications.',
        modules: [
          {
            name: 'Discovery & Alignment',
            summary: 'Translate business needs into scalable software blueprints.',
            capabilities: ['Stakeholder workshops', 'Process mapping', 'Solution architecture guides']
          },
          {
            name: 'Build & Integration',
            summary: 'Deliver applications with secure integrations and QA.',
            capabilities: ['Agile sprints', 'API integration packs', 'Automated testing suites']
          },
          {
            name: 'Governance & Support',
            summary: 'Ensure every release is compliant and maintained.',
            capabilities: ['Release management', 'Compliance reporting', '24/7 support coverage']
          }
        ],
        security: [
          'Zero trust access with MFA and SSO',
          'Field-level data encryption',
          'Dedicated audit logging with exportable reports'
        ],
        deploymentOptions: ['Private cloud', 'On-premise', 'Hybrid with sovereign cloud zones'],
        metrics: [
          { label: 'Discovery to MVP', value: '6-10 weeks' },
          { label: 'Release cadence', value: 'Bi-weekly sprints' },
          { label: 'Automation coverage', value: '70%+ workflows' }
        ],
        roadmap: [
          'Q2: Adaptive workflow intelligence',
          'Q3: Industry-specific compliance packs',
          'Q4: Built-in business continuity simulations'
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1fD5YWy3vCH3_wC0pCp4H2pdlc6nHY0I2ru75lLJvOy-1y1RMRW-VbvGeq6fY5_twrL1DLcZzjuaJ8upXEgL0n-gFhU4H73k2X2p1l38PzV4rXUx8TQ7z29xgGJEm6zHd_ZeGUL9QpBdbKsSLrjRbpF4k3-GI8-PPzvMAa0rtVbgNNgUuE0-n40du1UBonqMOpkrfr0-SMTS0_BfkHKjGRGx5jQlUD6b8bt4a2H2gCJQx8KnoyJwLCF1l-aU'
      }
    ];

    const peripheralCategories: PeripheralCategory[] = [
      { id: 1, icon: 'monitor', name: 'Monitors', desc: '4K, Curved & Ultrawide' },
      { id: 2, icon: 'hub', name: 'Docking Stations', desc: 'Thunderbolt 4 & USB-C' },
      { id: 3, icon: 'keyboard', name: 'Input Devices', desc: 'Ergonomic Keyboards & Mice' },
      { id: 4, icon: 'lan', name: 'Networking', desc: 'Switches, Cables & Routers' }
    ];

    const laptopProducts: LaptopProduct[] = [
      {
        id: 1,
        title: 'HP EliteBooks',
        desc: 'Premium performance and military-grade security for mobile professionals.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYRFvVTDkC_2MUtqYQoeEjOoaPm2S47EwKD37C7vsAcjjhMPDFOdS66VJ9ninPaxNK6zjI0ggYjU_6gV4XOPxtzGKvVee-U66ffOEpq1k685PnDTm4iUB7NEeRuTCvtwwQRJDQ7yfVFP_KFkBXKZeVdumaJ4bK8a3kOcdZPCQMBr92CbJ8O8omrE9QYa4rJrp8RZgLBq5CvAaEoWHR3s6qIHBRFLJevmYwyWsztjJTD4Cz5JR4vsz9HQ_2-EZRCguba-U4Zh09mznz',
        tag: 'Enterprise Class',
        features: ['Wolf Security Integrated', 'Intel vPro Certified']
      },
      {
        id: 2,
        title: 'Dell OptiPlex & Precision',
        desc: 'Highly configurable desktops and professional workstations for intense workloads.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtXjgTejMqJAR3iHabWtb1menEoqf1MW6XTp1tuHZ90EbKY50yiclXajytgvG53g52kZxEOmLjss5a3eyqvIDwIOFFCPOB1Ow9aSQO_6eWoL5ZuiJfFKopHM0lM-ekxUO2_JGWUdMLNqvzBHZDjpUXufOBm1dE0m-l-ynlkWWQqGZRmx998NroxfSYTYmoyJjPTmgQz4Q-m8dz15a8ATUao8mpssE1kdFXv1uWADopaLUBaEO1OaJEuy2yNhwc0ARIzNBu_S0s-RIY',
        tag: 'Workstations',
        features: ['ISV Certified Hardware', 'Sustainable Design']
      },
      {
        id: 3,
        title: 'Internal Components',
        desc: 'Genuine RAM, SSDs, and processors to keep your existing infrastructure running at peak speed.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXS-JYhTavj9aLfGjUFwM8-rGIH2WL0vfWgAcZU3IXJ9_cl8DVYz54UACcqb4vnpkz7ePr1ryPsQ9NX18kk4gJZMaWZy_XVDvO7DpI8QQB2c_zKG7c7XPTIJNy0Ag1YozqSs7IDTIyLEERXOT7G4C3SsPkJCU3XBhmq5xam9SR5C151NANA1ae1kUjARoWm6gJ_QBjTBrKKB3m5v8bO-qoU9e4hNFlhHaytUL4FOfkuqQZR4AFoh0I05LNMKqm797m3osrBEcpgLCG',
        tag: 'Parts & Upgrades',
        features: ['Enterprise NVMe SSDs', 'ECC Memory Modules']
      }
    ];

    const officeSolutions: OfficeSolution[] = [
      { id: 1, title: 'Epson Solutions', icon: 'print', desc: 'PrecisionCore technology for high-volume business printing.' },
      { id: 2, title: 'HP LaserJets', icon: 'local_printshop', desc: 'The industry standard for secure, fast, and efficient laser printing.' },
      { id: 3, title: 'Document Scanners', icon: 'scanner', desc: 'High-speed duplex scanning for digital archiving and workflows.' },
      { id: 4, title: 'Projectors', icon: 'videocam', desc: '4K and High-Lumen projectors for boardrooms and large venues.' }
    ];

    const consumables: ConsumableItem[] = [
      { id: 1, name: 'HP LaserJet', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApUPzN6Rf4iMQmOxCus9Aqg9Hpk2hGoP314eOKKdFpj81VyhGaMirwSnIW6ZnsVQTLhubUmfBAW9Q-4s6BCLlWbDi8JMbkEurYlm-55YIeQv7Hk9-OkHbgKZ8UdRD2zy85tSD5hl9IJZLUFXXUdEMbKYkamxSlJByANbVSu2-aOwiclSbPzJVV_Qr-Lr53Q-wb9GGoNWOst_J9R8e3s8X-zO7mqDSCj21T4PaJXsqVe-Iz6iGP6c1FPXyOXbbLMDTnK3gTcljcao9R' },
      { id: 2, name: 'Brother Ink', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf3STESFT9tNNn_oY4EBRTeaQx3hMeHsm6AdS4iK6mCIwP5yk3axu35TrFe0J3xcw5h0aN-th8CZZZEqmrw7mtKBIe_9vYRF1HBNAkVgcI2-2H5fqPTIVk26y2CbCPWpjb9FHUpTyHHoUz2LP_ALDveW5wpJ2XKsiJhszm0SjVqkynatK5OtHQPe2xsiUN9XR0re37IJnYZm0gvaJmlf-a9ONedrHo-ijJEbgmu_h9GwHxOJM8QnQC9Kxe9W0Qnj2JMNfLqP-CAVsB' },
      { id: 3, name: 'NCR Papers', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoCMq04dZGH0LbR0wYzY8II__eQShlYurBIIkvC_ISr4HC3ADkq1t9IyT_nFzXPcVQvrC5wxdSSLQmBaWB0t69PoKZmN5KWf6TOnKcQA7nNZndEwnEzinUOIU-y9xRDDHQ0JkmPHcuoXDHjDilYBHNZqZLZW57pCf5nzGL5yqNNBMqaY4shWvoOkwi4aWnPt1uGntL-ewNx02xi82JxNwahQ4JEmezb542rkRKShUu1qShszZK_TBolJqQ_iNwRJ6uaHoQUgIHhKTP' },
      { id: 4, name: 'Epson EcoTank', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdJC4YFGHixGWcplc0-4jkqRtnj8FL_uRmMhURuAGVyWpJprMLl6ARC_zLj1sCYzqJh3LrPyO9MMZZfDIhSfMIFaKa2ndZVZuoS1EmtSwECXOlpHwTa647Z84IKgKwD6rj8LEP9t_LEB36EEFT3dOenqxFujGUtFpW205mm2sWsVjdYNSiEoxqFJt3GjgJr2kpATRK--vkK5j-tvt51xRZGOgetsH7Hk6QGB_wxTRSV6qyDyrADO67-JQaq_OewZE__xhuPI5hFmto' }
    ];

    const insights: Insight[] = [
      {
        id: 1,
        category: 'Infrastructure',
        title: 'Building Resilient Data Centers in High-Humidity Environments',
        desc: 'How advanced cooling systems and proper rack design can prevent hardware failure in Bangladesh\'s climate.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxKoVT8Bn7wZKE_sMh38GXTKWKm4rIQZqCOfmXU3UlXHRY4JpdESQleVRsg9ZifHGGsDI-JLCa4mWtYMNw0MgkJja40GSJP8nf7vQ7prgm2VkYZWFnSKU5rk_LG4Di99d2sgRGiuUGxdTMsLIAVppE_e0--R8I4y3YeW7PNovVGKnV_BXh3enTlv9W-TFu2FCM3UUbKAacbek9V_qbMBjYSnNMguO4lm5e21mgOTPawCVALQ3C_KqEhDgXM482n9D_Rn2Ijedzs0VU',
        author: 'Tanvir Hasan',
        role: 'Infrastructure Lead',
        date: 'Oct 24, 2023'
      },
      {
        id: 2,
        category: 'Cybersecurity',
        title: 'The Rise of Ransomware: Protecting Corporate Assets in 2024',
        desc: 'Strategies for implementing Zero Trust architecture across distributed enterprise networks.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCergsETW_h3TE1Ca4Ig1XUgjmE4P9-xRw3N3vsfB025hkDt0HUW6RdXn9MIyjZ23xcyUzk3X-dlHFG04nsZfhuig8ef8A5Y_25cprGmeqZdebOZZBd-d4Q6F_x_Knit3U9c51qrQRCyAMCaRUP1FfEcFJ5gv44fDlZ0CV0UuykIOTgd5vCqwDQIJ4yAK7jYk5u7PYFlqa_oGLt3d1KihFjeHk-92b-Z__oOIGvQUQmFgUtfSL3fZg7L4QdTBp1gxTjtTdArLiNoDAR',
        author: 'Sarah Rahman',
        role: 'Security Analyst',
        date: 'Nov 12, 2023'
      },
      {
        id: 3,
        category: 'Custom Software',
        title: 'Designing modular ERP systems for fast-growing teams',
        desc: 'How to break down requirements into configurable modules without losing speed of delivery.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9ds4I0I4mBDNW-_OMkYi002yCDZOcWB8oEG3B1MmT0R6Vtg3sVfgbq_Ym4EPly47jIoRZhgbdzkzgFtm6bGAbTy4f4qg_fjOGi-uw3X1r1b1nCHhTr0IrzsOwb2QLJ_liTFCDhtQMBmcPdK9W5DG1DKLYBVtb-TDLfHSwPVeXe4AW5cOoyPUkKqCOD2oPc-z0ZliKvNVs9xC3tsdTuWaNgEYh_DraGkozhwgn6LUa_YJgFyOi22HI1UT7EYNoUNKQX4Sh-d3SCp6P',
        author: 'Imran Khan',
        role: 'Solution Architect',
        date: 'Dec 05, 2023'
      }
    ];

    const missionStatements: MissionStatement[] = [
      {
        id: 1,
        quote: 'Technology is the tool, but experience is the outcome. We focus on the outcome.',
        text1: 'At EXOSISTECH, we believe the future belongs to those who adapt. We deliver a two-in-one approach that combines reliable electronics supply with custom software delivery.',
        text2: 'By bridging the gap between physical infrastructure and bespoke digital solutions, we ensure our partners stay ahead in a rapidly evolving tech landscape.'
      }
    ];

    const companyValues: CompanyValue[] = [
      { id: 1, title: 'Customer-Centric', icon: 'handshake', desc: 'We don\'t just sell products; we tailor solutions. Understanding your goals helps us deliver personalized value.' },
      { id: 2, title: 'Innovation', icon: 'lightbulb', desc: 'Staying on the bleeding edge of electronics and software to deliver future-proof solutions.' },
      { id: 3, title: 'Reliability', icon: 'shield_lock', desc: 'Building trust through a secure, consistent, and transparent delivery network you can depend on.' }
    ];

    const clients: ClientLogo[] = [
      { id: 1, name: 'Pubali Bank', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjwsIA0cEQU4-BnWhf7KCg0B92gAneQjMhOvvFplkDN85Sx5n_vZNUUrA4u-PyE6iO88T04KpbJf44_DeEtn08ru3O_QnyDbp59wg-YfeTtkpODsKzS2W361f6zWHNXF2L0JkrIEoLBdBBgXAW-fAr1VRnzJVb1YDAJKFFWD7K6jRROZs93qcq1KFZMglwTUCZx8Tz6qDDhWMCr48TwUaqidSdwEBaGK8tqM7s62AyE2-EMCjyb4Zc6BOQySv86JjRCwKOfv11oQVk' },
      { id: 2, name: 'NCC Bank', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKHxOUKPcz7zkxPVwKYpv6au1nTVeUc97cUsafJnl59rd8AL0Lj8rLKseP1NsxOWwPLN0s9xcataahJDBCuJmzwPQP7XGy4127_kXsg27mF5UwsWcHQls6L-qI2TfFTaMq1kB4CDpP2ZNLEIwZ-hXTvBnwwPizfKKbXs7B-nupizYqEsX1AWqkHxd6ReYFKd9rBidiyMtB_Q60qHq-SmakP1n8ZCRSGpDa2AOuvn4xvrOzVDXE7pfxpZ6OhC-mBa0ni161zO25jAWC' },
      { id: 3, name: 'Incepta Pharma', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8qDG66edMBzTaLSYAvHpK2dp1ZVMiLGINwEe1D-BRkJyIFQb3-s3FtarZ_Doq2sdjM3CzSPP0KRcK4yKZ_-o_ZC8i0yMyWFcfXSgBBPgLxJTMgjpq1PAcEwyNP8GLjHK7uHnHey1OJKhyjO--BBclGR6B_beysFNjSyvZsa8LgChGufY_uOdms6iMNOz61mPEJGRbwNsMKyv-GVMD8AuUNc_fTD6fqeLclyhYg-YXh0pwvZ3Jmlyaqiswhh6J3LMWVVzka9lidDu9' },
      { id: 4, name: 'Pacific Pharma', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0nZ87eSEivNfEdOWYkAxMxHF6-jgBoRWRZJKUuR-yu-NkO9Obx4GPBSimwzTDiTDDlcPRCZP-qh4fwHSqHAkMhxJI9JlvsozN0yzJsANd9O2oZCAtHINEbaSQl5z59V97tn7qWPuJN9Xg1n1n92Ss2wYlgvoh1P-c3L7R3d_JkOgLoAM7YPzjbCVN2J3q54HfqBSJ975Yp2cJGCliDwayw-MD75-qPmmtwxxk4GMfR8vn3_I9LDVSbR55t9I7TIFSFmk_3atJcuhq' },
      { id: 5, name: 'Bangladesh Eye Hospital', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZIkU8BlCJEySHIdv-thMIr145UO65KrHQKxILx_V11t5vNz2iWwA9pMZwuoFLy7k-2vzgPYpBJ2Kxq-mifx09lmOznRrRDLoxcxFriuATrTetvNhX4P1yGAW3iPjFUeW_TMxXYleTkyiGfZ87wzdKF-Yvdt28PgSFSsHRZEbAeW46v7tZGN3Suh2emvkRQuUMcw1POfWOZ3TuyvRNeopYp4xPTpJtbPGDcL9b89a-ek3bCz52R8Z78VCZNBRy6WoDANtXR8vvpUoo' },
      { id: 6, name: 'Padma Bank', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ5XbVKhHMwf_XcCCzWfyaE7ESOIAMbvDy0x1p87scQYbSbLzS8ycMuEAnZebH2pTvCyZHkfTJnIq9U5tlPB29miwfGRBAq2naLob2sd8Ecfc_oMrcA2rfcsPjzaRnVpuHjdP9hDUpNLt--YwHbveeU4PpErSBdEDKr4bl-hL8kJ2HqOs31exmMnjv7PuIz-kZTUdXRjFwf5mdOwyI1vqO7RHWZRX2br86EJvR6kMS_rjlZ7X84rUnM6MW6gZNRgyXIJAAfQbcBLVt' },
      { id: 7, name: 'Bangladesh Police', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt8SCYniong0KnxDtNACA_ohHxtLEcSZ09l_y8rGVVqdDfSfBCaj6BmOgMZgKvGGmkhZ7z3iqMint8lv4hMhMY21fOG9BqreGhqknsrCJeqiH7Ef7kcV0nMH6Zsr2_2yD01774uyCDYPAhU9e7oofEw8lfsedHRroSt9WnQTwm9VcKXb1y4uw8duGAKBx9nmIFW0nUc4Irq5bS9vJKYV1bbQk9ShLlrHFXzdXCurIIrv8I8IyBxNYfwniX0EtDvuAjhxfnJo2N0kTY' }
    ];

    const jobApplications: JobApplicationPayload[] = [];

    return {
      solutions,
      jobs,
      team,
      partners,
      testimonials,
      products,
      enterpriseSoftware,
      jobApplications,
      peripheralCategories,
      laptopProducts,
      officeSolutions,
      consumables,
      insights,
      missionStatements,
      companyValues,
      clients
    };
  }
}
