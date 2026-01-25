import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Solution, Job, TeamMember, Partner, Testimonial, ProductDetail, EnterpriseSoftware, JobApplicationPayload, SolutionSoftware, CartItem, OrderPayload, User } from '../models/entities';

export class MockDataService implements InMemoryDbService {
  createDb() {
    const solutions: Solution[] = [
      {
        id: 1,
        title: 'Industrial Solutions',
        desc: 'Automation, plant monitoring, and asset optimization suites designed for high-volume production environments.',
        icon: 'precision_manufacturing',
        category: 'Industrial',
        brands: ['FactoryFlow', 'PulseGrid', 'SteelSight'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8H7o--VJsglK41fZd4Knx6AqT0R07Iyuzwq0tEq1Qh6yn2SazAG9J0wmAlc6MQzZ5yBEv0Kp0mlEH0u6R4jRQYvpxE0uKXxLhNqYlziVKRwH9WptMEFnHq0sCzNEKUxD4QmNW9GhkfGEXy7Frv5y5rFG8Osr3k8m1g7VZ9zFY7q0RTe8VwRpmxUYLd0dh20zGX-YwiFDZtd-ynpBuE2D0L-D5WFRcE8HmZC-CEuG2MK1e9E1E6XPQcXxFU4T0G0'
      },
      {
        id: 2,
        title: 'Corporate Solutions',
        desc: 'Integrated workplace platforms that streamline finance, HR, and operational visibility for growing enterprises.',
        icon: 'business_center',
        category: 'Corporate',
        brands: ['BoardroomIQ', 'FlexFinance', 'OpsPulse'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9ds4I0I4mBDNW-_OMkYi002yCDZOcWB8oEG3B1MmT0R6Vtg3sVfgbq_Ym4EPly47jIoRZhgbdzkzgFtm6bGAbTy4f4qg_fjOGi-uw3X1r1b1nCHhTr0IrzsOwb2QLJ_liTFCDhtQMBmcPdK9W5DG1DKLYBVtb-TDLfHSwPVeXe4AW5cOoyPUkKqCOD2oPc-z0ZliKvNVs9xC3tsdTuWaNgEYh_DraGkozhwgn6LUa_YJgFyOi22HI1UT7EYNoUNKQX4Sh-d3SCp6P'
      },
      {
        id: 3,
        title: 'Banking Solutions',
        desc: 'Secure, compliant software ecosystems that modernize banking operations and customer experiences.',
        icon: 'account_balance',
        category: 'Banking',
        brands: ['CorePulse', 'VaultGuard', 'BranchSync'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvOFJbtXss0-oOURmaN1XCNQ5v3AnbTlbAzq45HxpDt2bLlHmFJvFRP08mC7jebApLqIa5LeuXEprsCCfgmTIQQT5mV7m3k8zT-FSSo8Wf7R2b98lk3irtXZdM5xVN2HLaH7Rx68cFE5wenKrf2VtrPoCgJfT-wKs8v2ApTlSjzuPhsGLuw7pP395_VBJkS7CoW5sWG7VQRQ8XGugo5Mdj2Ul1bc0oVahkLkIYG8tnEKOIfYlQq3uI7_ftO1P_FRCWxpq5gJ85M7hP'
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
        name: 'Exoosis ERP Suite',
        category: 'Business Operations',
        summary: 'A unified ERP platform that connects finance, supply chain, HR, and compliance workflows through API-driven automation.',
        price: 1200,
        priceUnit: '',
        brand: 'Exoosis',
        highlights: [
          'Automated approval workflows with audit trails',
          'Real-time financial close dashboards',
          'Embedded analytics with role-based views'
        ],
        integrations: ['SAP', 'Oracle Netsuite', 'Salesforce', 'Microsoft Dynamics'],
        specs: [
          { label: 'Deployment', value: 'Hybrid, Private Cloud, On-Prem' },
          { label: 'Data Residency', value: 'Configurable per region' },
          { label: 'SLA', value: '99.95% uptime' },
          { label: 'Compliance', value: 'ISO 27001, SOC 2 Type II' }
        ],
        pricingTiers: [
          { name: 'Growth', description: 'Core ERP modules and onboarding support.', monthlyCost: '$1,200 / month' },
          { name: 'Scale', description: 'Advanced automation, API quotas, and analytics.', monthlyCost: '$2,800 / month' },
          { name: 'Enterprise', description: 'Custom workflows, premium SLA, dedicated CSM.', monthlyCost: 'Custom' }
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9jZ1Ncg0cRrJH7GfVjbg4Q-6DLW3l1o-mxb6amOeSvZPQDCq7aT66a1D3ey4XgkKx6rT-7G1dW9UOyy5eOCAfE3xvvUS3BEp4rLKBbQLef5UIF1ZMX-Vab4gHhL0X2_z3PUxewTTWQ4mDmXTaFoR7Z8RV2S_Sr9ZbEY87HBqzwh0bP_Mqp1FuoN29d4U7m6LJYHdR6BkiO0qXW49XB5TB3Db8tzzn5lSw8B-evA5gQwP3k_VXdnTQc8oGHEMbxyL8jS7u'
      },
      {
        id: 'exo-edge-platform',
        name: 'Exoosis Edge Platform',
        category: 'Infrastructure & Edge',
        summary: 'A secure, low-latency edge computing fabric that keeps mission-critical workloads close to your customers.',
        price: 950,
        priceUnit: '',
        brand: 'Exoosis',
        highlights: [
          'Zero-trust device onboarding',
          'Predictive workload scaling',
          'Unified monitoring across edge nodes'
        ],
        integrations: ['Kubernetes', 'Azure Arc', 'VMWare Tanzu', 'AWS IoT'],
        specs: [
          { label: 'Latency', value: '< 20 ms average' },
          { label: 'Edge Nodes', value: 'Up to 2,000 per cluster' },
          { label: 'Observability', value: 'OpenTelemetry + Prometheus' },
          { label: 'Data Encryption', value: 'AES-256 at rest and in transit' }
        ],
        pricingTiers: [
          { name: 'Launch', description: 'Edge starter bundle with 10 nodes.', monthlyCost: '$950 / month' },
          { name: 'Accelerate', description: 'Multi-region edge plus SOC monitoring.', monthlyCost: '$2,100 / month' },
          { name: 'Enterprise', description: 'Custom SLAs and dedicated edge architects.', monthlyCost: 'Custom' }
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAENrHBI8vO5kXOH8lO-4xFnTg4NVZfkJok8R48lA-4WTB7J2UWM61CFxgEEhG_0nQGgxE9QOjMJhT7jG_w0Dgq0AHjYvN5kWJmVQmJ1fmf0eJm5cY4FKcY42hVcq41MMD3ez18iRHy2jg2rZ0uOM34iEPO5O_zVrhK0Uel3pw4dKgiRRt7BriN4wv9AXf_s4z6JMRgZ7x4yXKrJhjTeQpFp5tDYoGRdZ-30x0AXKaGD0ExoU'
      },
      {
        id: 'secure-shield-suite',
        name: 'SecureShield SOC Suite',
        category: 'Security',
        summary: 'Centralized SOC workflow tooling that automates threat intake, triage, and compliance reporting.',
        price: 1450,
        priceUnit: '',
        brand: 'SecureShield',
        highlights: [
          'SOAR playbooks with automated response',
          '24/7 alert correlation and enrichment',
          'Regulatory-ready audit dashboards'
        ],
        integrations: ['Splunk', 'Palo Alto Cortex', 'Microsoft Sentinel'],
        specs: [
          { label: 'Response SLA', value: '15 minutes avg.' },
          { label: 'Compliance', value: 'ISO 27001, PCI DSS' },
          { label: 'Managed Analysts', value: 'Included' },
          { label: 'Retention', value: '365 days logs' }
        ],
        pricingTiers: [
          { name: 'Core', description: 'Essential SOC tooling with standard response.', monthlyCost: '$1,450 / month' },
          { name: 'Advanced', description: 'Threat hunting + custom playbooks.', monthlyCost: '$2,600 / month' },
          { name: 'Enterprise', description: 'Dedicated analysts and SOC pods.', monthlyCost: 'Custom' }
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjwsIA0cEQU4-BnWhf7KCg0B92gAneQjMhOvvFplkDN85Sx5n_vZNUUrA4u-PyE6iO88T04KpbJf44_DeEtn08ru3O_QnyDbp59wg-YfeTtkpODsKzS2W361f6zWHNXF2L0JkrIEoLBdBBgXAW-fAr1VRnzJVb1YDAJKFFWD7K6jRROZs93qcq1KFZMglwTUCZx8Tz6qDDhWMCr48TwUaqidSdwEBaGK8tqM7s62AyE2-EMCjyb4Zc6BOQySv86JjRCwKOfv11oQVk'
      },
      {
        id: 'atlas-network-core',
        name: 'Atlas Network Core',
        category: 'Networking',
        summary: 'High-performance network stack for branch-to-cloud connectivity with zero-touch provisioning.',
        price: 799,
        priceUnit: '',
        brand: 'Atlas',
        highlights: [
          'SD-WAN with automated failover',
          'Application-aware traffic steering',
          'Integrated firewall and IDS'
        ],
        integrations: ['Cisco Meraki', 'Fortinet', 'VMware VeloCloud'],
        specs: [
          { label: 'Branch support', value: 'Up to 500 branches' },
          { label: 'Traffic encryption', value: 'AES-256 VPN' },
          { label: 'SLA', value: '99.9% uptime' },
          { label: 'Monitoring', value: 'Real-time NOC dashboard' }
        ],
        pricingTiers: [
          { name: 'Branch', description: 'Up to 50 branch nodes.', monthlyCost: '$799 / month' },
          { name: 'Regional', description: 'Up to 200 branch nodes.', monthlyCost: '$1,450 / month' },
          { name: 'Enterprise', description: 'Global rollout with NOC.', monthlyCost: 'Custom' }
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZpZskbGC7FKHPiy6ULa47zVQlA9SCMHOy8GaTc3tyk21Lx4eBFwA2iMFw6d-xiK-xswjckHEqiTu8yKLtVUGUTOkINKT8sokr_GSx0LHEntUBcVR3lrUVQFJ1taoAmvaKo4syFy3wuUKBLqHnNkBtM0UeEy4kWVJpJUoqyjT4qvZ2TVrDfALfXcd1cMyDxqWv9a-wWhpNB2r1Xta7e2FfI16Xy8IM7QNzi9io9fjtIF1xRkmLmRuQaKyz3i2WFxB1kjTZF3cie70q'
      },
      {
        id: 'nova-workstation-pro',
        name: 'Nova Workstation Pro',
        category: 'Workstations',
        summary: 'Enterprise-grade workstation bundle for creative and engineering teams.',
        price: 2499,
        priceUnit: '',
        brand: 'Nova',
        highlights: [
          'Intel Xeon W processor',
          'NVIDIA RTX professional graphics',
          'ISV-certified performance profiles'
        ],
        integrations: ['Autodesk', 'Adobe Creative Cloud', 'SolidWorks'],
        specs: [
          { label: 'CPU', value: 'Xeon W-2295' },
          { label: 'GPU', value: 'RTX A4000 16GB' },
          { label: 'Memory', value: '64GB DDR4 ECC' },
          { label: 'Storage', value: '2TB NVMe SSD' }
        ],
        pricingTiers: [
          { name: 'Studio', description: 'Single workstation bundle.', monthlyCost: '$2,499 / unit' },
          { name: 'Team', description: '5+ workstation kit.', monthlyCost: '$2,299 / unit' },
          { name: 'Enterprise', description: 'Custom imaging + SLA.', monthlyCost: 'Custom' }
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA02rKrOGx6VcTpgDMIiYqP8bN_Y-xdnVXaOKhPuSpq_hK9IcwEr8JxyNJXoqIrICD9aHg1WZC6TBHpWH0lLalWlZ5YpiG2GTO50M7oENyRKft8wtuWFg3CELD7uUT2aO4_F_AnIUZ0bpy-QFtC2hDcZEGs-ijovcmIMcHIq8UgE4T2HaPzT2GcgIRip9_muU1t32X9ta3Hm-nwgG9mSDpn85Kfj6PJy1pDr_rl3_BVMUc3pR7uSuy0i2t0WkNKC-YLG4AoTXIYKpI8'
      },
      {
        id: 'ultra-print-hub',
        name: 'UltraPrint Hub',
        category: 'Printing & Imaging',
        summary: 'Enterprise print management suite that optimizes device uptime and supply automation.',
        price: 420,
        priceUnit: '',
        brand: 'UltraPrint',
        highlights: [
          'Fleet health analytics with auto-ticketing',
          'Secure print release and user controls',
          'Supply forecasting and vendor SLA tracking'
        ],
        integrations: ['Epson', 'HP', 'Canon'],
        specs: [
          { label: 'Device coverage', value: 'Up to 1,200 devices' },
          { label: 'Support', value: '24/5 onsite response' },
          { label: 'Security', value: 'Zero-trust print queues' },
          { label: 'Reporting', value: 'Power BI export' }
        ],
        pricingTiers: [
          { name: 'Core', description: 'Up to 250 devices.', monthlyCost: '$420 / month' },
          { name: 'Scale', description: 'Up to 800 devices.', monthlyCost: '$790 / month' },
          { name: 'Enterprise', description: 'Custom fleet monitoring.', monthlyCost: 'Custom' }
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBugxH99sYmEflAc-Cpmi3whfe60Y5k_gNmy2tgNb2OFVEdND5plG4g7hnckJ7ie_jW4FkwXo8Hajz7JNy-6YLYCHzqq_mBUXwV49LFah-P1bJtROhdgvCuoU3zAI7qNXztsMAeLj4hK4JpnWeegkXBLtWLNgXjg904--Ifb0guEoIfdSeUp_DaTC9kSnItpA8RTmYdsDC8HQ-2cc2blvqsCZ2BZoOHrNRafJZ8gdTlcPGtePx5ZHOHVzp2tBMa1SYU7BZQwE8xo62_'
      }
    ];

    const enterpriseSoftware: EnterpriseSoftware[] = [
      {
        id: 'enterprise-command-center',
        name: 'Enterprise Command Center',
        tagline: 'A unified operations layer for regulated enterprises.',
        description: 'Centralize critical systems into a secure command center that unifies observability, governance, and automation across hybrid estates.',
        modules: [
          {
            name: 'Unified Observability',
            summary: 'Consolidate telemetry across cloud, edge, and on-prem workloads.',
            capabilities: ['Real-time service maps', 'AI-powered anomaly detection', 'Executive KPI dashboards']
          },
          {
            name: 'Workflow Automation',
            summary: 'Orchestrate approvals, incident response, and change management.',
            capabilities: ['Low-code playbooks', 'Integration with ITSM tools', 'Automated remediation']
          },
          {
            name: 'Governance & Compliance',
            summary: 'Ensure every change is auditable and compliant.',
            capabilities: ['Policy-as-code enforcement', 'Compliance reporting', 'Continuous risk scoring']
          }
        ],
        security: [
          'Zero trust access with MFA and SSO',
          'Field-level data encryption',
          'Dedicated audit logging with exportable reports'
        ],
        deploymentOptions: ['Private cloud', 'On-premise', 'Hybrid with sovereign cloud zones'],
        metrics: [
          { label: 'Deployment time', value: '6-10 weeks' },
          { label: 'Mean time to detect', value: 'Under 5 minutes' },
          { label: 'Automation coverage', value: '70%+ workflows' }
        ],
        roadmap: [
          'Q2: Adaptive risk scoring powered by AI',
          'Q3: Industry-specific compliance packs',
          'Q4: Built-in business continuity simulations'
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1fD5YWy3vCH3_wC0pCp4H2pdlc6nHY0I2ru75lLJvOy-1y1RMRW-VbvGeq6fY5_twrL1DLcZzjuaJ8upXEgL0n-gFhU4H73k2X2p1l38PzV4rXUx8TQ7z29xgGJEm6zHd_ZeGUL9QpBdbKsSLrjRbpF4k3-GI8-PPzvMAa0rtVbgNNgUuE0-n40du1UBonqMOpkrfr0-SMTS0_BfkHKjGRGx5jQlUD6b8bt4a2H2gCJQx8KnoyJwLCF1l-aU'
      }
    ];

    const solutionSoftware: SolutionSoftware[] = [
      {
        id: 'indus-ops-suite',
        name: 'IndusOps Control Suite',
        category: 'Industrial',
        summary: 'A real-time manufacturing execution platform that harmonizes production scheduling and plant visibility.',
        description: 'IndusOps connects shop-floor machines, sensors, and supervisory teams to reduce downtime, optimize throughput, and keep compliance logs ready for audits.',
        capabilities: [
          'Adaptive production scheduling with shift-based logic',
          'Machine health dashboards with predictive alerts',
          'Digital work orders and quality checklists'
        ],
        industries: ['Textiles', 'Pharmaceuticals', 'Heavy Manufacturing'],
        integrations: ['Siemens PLC', 'SCADA Systems', 'SAP S/4HANA'],
        compliance: ['ISO 9001', 'GMP', 'Occupational Safety Standards'],
        deployment: ['On-premise', 'Hybrid cloud gateway'],
        support: [
          { label: 'SLA', detail: '24/7 plant-critical response, 99.9% uptime' },
          { label: 'Training', detail: 'On-site operator training and digital playbooks' },
          { label: 'Monitoring', detail: 'Dedicated industrial IoT command center' }
        ],
        metrics: [
          { label: 'Downtime reduction', value: 'Up to 32%' },
          { label: 'OEE improvement', value: '+18% within 90 days' },
          { label: 'Audit preparation', value: '50% faster' }
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgcXQhWdaWqnwjj43imXNB9RJfmebt_4dvUXQm7ccTnGvhmaruRI0iY592w9XpFcPCn4y-T_hFKWgewlAqtbKiuPieoZ5icwpjvCuZY1ms3GqgKigFcBSmSFgWcEI3cs910QQaPshdKMXbMPsimH3n4b7DAGhwgGujpkyQdyoFUIO0R7YWypyZdqJpT5gHi_l-vxopOz1MGFDMg7dAa36v0EVHYtkbmhnrPL4AorQnBXri99mtkt-n419VGsbiYuN7KEpSvEdCSE2X'
      },
      {
        id: 'plant-asset-hub',
        name: 'Plant Asset Hub',
        category: 'Industrial',
        summary: 'A central asset reliability workspace for tracking utilities, spare parts, and maintenance SLAs.',
        description: 'Plant Asset Hub provides unified visibility into critical machinery, inventory, and preventive maintenance to keep production lines running efficiently.',
        capabilities: [
          'Digital asset registry with lifecycle tracking',
          'Predictive maintenance workflows',
          'Spare parts forecasting and procurement alerts'
        ],
        industries: ['Energy', 'Cement', 'Food Processing'],
        integrations: ['IBM Maximo', 'Oracle EAM', 'Power BI'],
        compliance: ['ISO 55001', 'Energy Safety Codes'],
        deployment: ['Private cloud', 'On-premise'],
        support: [
          { label: 'SLA', detail: 'Business-hours support with on-call escalation' },
          { label: 'Consulting', detail: 'Reliability engineering workshops' },
          { label: 'Analytics', detail: 'Monthly asset utilization reviews' }
        ],
        metrics: [
          { label: 'Maintenance cost', value: '-22% year-over-year' },
          { label: 'Asset utilization', value: '+12% capacity uplift' },
          { label: 'Spare stockouts', value: 'Near zero' }
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9jZ1Ncg0cRrJH7GfVjbg4Q-6DLW3l1o-mxb6amOeSvZPQDCq7aT66a1D3ey4XgkKx6rT-7G1dW9UOyy5eOCAfE3xvvUS3BEp4rLKBbQLef5UIF1ZMX-Vab4gHhL0X2_z3PUxewTTWQ4mDmXTaFoR7Z8RV2S_Sr9ZbEY87HBqzwh0bP_Mqp1FuoN29d4U7m6LJYHdR6BkiO0qXW49XB5TB3Db8tzzn5lSw8B-evA5gQwP3k_VXdnTQc8oGHEMbxyL8jS7u'
      },
      {
        id: 'corporate-unify',
        name: 'Corporate Unify Workspace',
        category: 'Corporate',
        summary: 'An integrated operations suite that unites finance, HR, and procurement with real-time analytics.',
        description: 'Corporate Unify provides a single command center for enterprise stakeholders to manage budgets, approvals, and workforce operations without siloed tools.',
        capabilities: [
          'Automated budget approvals with audit trails',
          'Headcount planning and talent mobility dashboards',
          'Smart procurement with vendor scorecards'
        ],
        industries: ['FMCG', 'Technology Services', 'Retail Chains'],
        integrations: ['Microsoft 365', 'SAP SuccessFactors', 'ServiceNow'],
        compliance: ['SOC 2', 'ISO 27001', 'GDPR-ready'],
        deployment: ['Hybrid cloud', 'Private cloud'],
        support: [
          { label: 'SLA', detail: '99.95% uptime with dedicated customer success' },
          { label: 'Onboarding', detail: 'Process mapping and KPI design' },
          { label: 'Enablement', detail: 'Role-based learning library' }
        ],
        metrics: [
          { label: 'Approval cycle time', value: '40% faster' },
          { label: 'Operating cost', value: '-18% in 6 months' },
          { label: 'User adoption', value: '92% active usage' }
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAENrHBI8vO5kXOH8lO-4xFnTg4NVZfkJok8R48lA-4WTB7J2UWM61CFxgEEhG_0nQGgxE9QOjMJhT7jG_w0Dgq0AHjYvN5kWJmVQmJ1fmf0eJm5cY4FKcY42hVcq41MMD3ez18iRHy2jg2rZ0uOM34iEPO5O_zVrhK0Uel3pw4dKgiRRt7BriN4wv9AXf_s4z6JMRgZ7x4yXKrJhjTeQpFp5tDYoGRdZ-30x0AXKaGD0ExoU'
      },
      {
        id: 'corporate-insight',
        name: 'Corporate Insight CRM',
        category: 'Corporate',
        summary: 'A customer and partner intelligence suite that powers revenue operations with unified visibility.',
        description: 'Corporate Insight blends sales, support, and marketing journeys into a single workspace so leadership teams can track pipeline health and service quality.',
        capabilities: [
          'Unified client 360-degree profiles',
          'Forecasting dashboards for revenue leaders',
          'Omnichannel service ticket routing'
        ],
        industries: ['Consulting', 'Logistics', 'Telecom'],
        integrations: ['Salesforce', 'HubSpot', 'Zendesk'],
        compliance: ['ISO 27001', 'PCI DSS Ready'],
        deployment: ['Cloud-native', 'Private cloud option'],
        support: [
          { label: 'SLA', detail: 'Priority response for enterprise customers' },
          { label: 'Success', detail: 'Quarterly business reviews' },
          { label: 'Security', detail: 'Dedicated security advisory' }
        ],
        metrics: [
          { label: 'Customer retention', value: '+15% uplift' },
          { label: 'Case resolution', value: '30% faster' },
          { label: 'Forecast accuracy', value: '+20% improvement' }
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCergsETW_h3TE1Ca4Ig1XUgjmE4P9-xRw3N3vsfB025hkDt0HUW6RdXn9MIyjZ23xcyUzk3X-dlHFG04nsZfhuig8ef8A5Y_25cprGmeqZdebOZZBd-d4Q6F_x_Knit3U9c51qrQRCyAMCaRUP1FfEcFJ5gv44fDlZ0CV0UuykIOTgd5vCqwDQIJ4yAK7jYk5u7PYFlqa_oGLt3d1KihFjeHk-92b-Z__oOIGvQUQmFgUtfSL3fZg7L4QdTBp1gxTjtTdArLiNoDAR'
      },
      {
        id: 'bank-core-modern',
        name: 'BankCore Modernization',
        category: 'Banking',
        summary: 'A compliance-first core banking modernization suite with omnichannel orchestration.',
        description: 'BankCore Modernization enables banks to migrate legacy systems into a secure, modular platform while delivering improved customer journeys.',
        capabilities: [
          'Real-time ledger and transaction monitoring',
          'Digital onboarding with KYC automation',
          'Branch-to-digital orchestration'
        ],
        industries: ['Retail Banking', 'Microfinance', 'Islamic Banking'],
        integrations: ['Temenos', 'Oracle FLEXCUBE', 'Mambu'],
        compliance: ['Bangladesh Bank Guidelines', 'PCI DSS', 'SOC 2'],
        deployment: ['Hybrid cloud', 'On-premise'],
        support: [
          { label: 'SLA', detail: 'Regulatory-grade uptime monitoring' },
          { label: 'Migration', detail: 'Legacy system migration playbooks' },
          { label: 'Security', detail: 'Continuous penetration testing' }
        ],
        metrics: [
          { label: 'Time-to-market', value: '60% faster launches' },
          { label: 'Operational risk', value: '-28% incidents' },
          { label: 'Digital adoption', value: '+35% growth' }
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjwsIA0cEQU4-BnWhf7KCg0B92gAneQjMhOvvFplkDN85Sx5n_vZNUUrA4u-PyE6iO88T04KpbJf44_DeEtn08ru3O_QnyDbp59wg-YfeTtkpODsKzS2W361f6zWHNXF2L0JkrIEoLBdBBgXAW-fAr1VRnzJVb1YDAJKFFWD7K6jRROZs93qcq1KFZMglwTUCZx8Tz6qDDhWMCr48TwUaqidSdwEBaGK8tqM7s62AyE2-EMCjyb4Zc6BOQySv86JjRCwKOfv11oQVk'
      },
      {
        id: 'vaultguard-suite',
        name: 'VaultGuard Risk Suite',
        category: 'Banking',
        summary: 'A security and risk governance platform built for multi-branch banking operations.',
        description: 'VaultGuard unifies fraud monitoring, regulatory reporting, and security orchestration for mission-critical banking operations.',
        capabilities: [
          'Real-time fraud detection with AI scoring',
          'Automated regulatory reporting',
          'Branch security posture management'
        ],
        industries: ['Commercial Banking', 'Digital Banks', 'Payment Providers'],
        integrations: ['SWIFT', 'IBM QRadar', 'Splunk'],
        compliance: ['AML/KYC', 'PCI DSS', 'ISO 22301'],
        deployment: ['Private cloud', 'Sovereign cloud zones'],
        support: [
          { label: 'SLA', detail: '24/7 security operations center' },
          { label: 'Risk', detail: 'Quarterly risk assessments' },
          { label: 'Advisory', detail: 'Regulatory compliance advisory' }
        ],
        metrics: [
          { label: 'Fraud response time', value: 'Under 2 minutes' },
          { label: 'Audit readiness', value: 'Always-on reporting' },
          { label: 'Operational loss', value: '-30% reduction' }
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKHxOUKPcz7zkxPVwKYpv6au1nTVeUc97cUsafJnl59rd8AL0Lj8rLKseP1NsxOWwPLN0s9xcataahJDBCuJmzwPQP7XGy4127_kXsg27mF5UwsWcHQls6L-qI2TfFTaMq1kB4CDpP2ZNLEIwZ-hXTvBnwwPizfKKbXs7B-nupizYqEsX1AWqkHxd6ReYFKd9rBidiyMtB_Q60qHq-SmakP1n8ZCRSGpDa2AOuvn4xvrOzVDXE7pfxpZ6OhC-mBa0ni161zO25jAWC'
      }
    ];

    const jobApplications: JobApplicationPayload[] = [];

    const cart: CartItem[] = [];

    const users: User[] = [
      { id: 1, name: 'Arafat Rahman', email: 'arafat@exoosis.com', password: 'exoosis2025', role: 'Client' },
      { id: 2, name: 'Nusrat Jahan', email: 'nusrat@exoosis.com', password: 'secure123', role: 'Partner' }
    ];

    const orders: OrderPayload[] = [];

    return { solutions, jobs, team, partners, testimonials, products, enterpriseSoftware, solutionSoftware, jobApplications, cart, users, orders };
  }
}
