import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Solution, Job, TeamMember, Partner, Testimonial, ProductDetail, EnterpriseSoftware, JobApplicationPayload } from '../models/entities';

export class MockDataService implements InMemoryDbService {
  createDb() {
    const solutions: Solution[] = [
      {
        id: 1,
        title: 'IT Hardware',
        desc: 'High-performance workstations, servers, and peripherals tailored for business efficiency. From personal computing to data center racks.',
        icon: 'computer',
        category: 'Hardware',
        brands: ['HP Enterprise', 'Dell', 'Asus', 'Lenovo'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcZ81cRXiCLudcPpC1mKykToYYsqrjORX7BVyLuxLVdnpvEvluhCsmkrVJWHQBQBEfaGtUxiDhxo_NTJW0uMseVvwBb2zobviXqGfjW57ry7oXauQjeJUGLhDrZGz3eLAlzjtXglZiwkbePG3oTMoGYcT6KafGzIIDuHSLSCLG3YCVeGEK8PBCAd6ZnpSGu61IQc1pxn-9-TLP2qQRygeq9AR2pC4gZlC_pRSlUTPLO2dujD83ko844Hed7CAJuwWfFiwWgekeXaJ5'
      },
      {
        id: 2,
        title: 'Networking',
        desc: 'Robust connectivity solutions including switches, routers, and wireless access points designed for seamless enterprise communication.',
        icon: 'router',
        category: 'Networking',
        brands: ['Cisco', 'Ruijie', 'Ruckus'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCergsETW_h3TE1Ca4Ig1XUgjmE4P9-xRw3N3vsfB025hkDt0HUW6RdXn9MIyjZ23xcyUzk3X-dlHFG04nsZfhuig8ef8A5Y_25cprGmeqZdebOZZBd-d4Q6F_x_Knit3U9c51qrQRCyAMCaRUP1FfEcFJ5gv44fDlZ0CV0UuykIOTgd5vCqwDQIJ4yAK7jYk5u7PYFlqa_oGLt3d1KihFjeHk-92b-Z__oOIGvQUQmFgUtfSL3fZg7L4QdTBp1gxTjtTdArLiNoDAR'
      },
      {
        id: 3,
        title: 'Security & Surveillance',
        desc: 'Comprehensive security infrastructure including CCTV, biometric access control, and smart monitoring systems for facility safety.',
        icon: 'security',
        category: 'Security',
        brands: ['Hikvision', 'Dahua', 'ZKTeco'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCALu8AoJ9x6w84v4gGjTIqxZn3XaHRJvvb2H62xHgwaFNY67uCYo8-F3vpjvtmAJ3tQI6bCvwwnkPA-PjmRx9Z_SW_q9J2EwOLd7xX_EG8PvCkqH8qVkqeBywW-cvPdoxkBAud1_2E_YoXfYjGy5EjdH99kQVjwUEGaLf8YCercz1rg9mgjjdwnAfMQVm9UWn9624aIUaJk7W5lRi6Id_y9Gy2GOB0aB32VtdDJULCf-TWgnnP_J75YOxujHfhkDO4HHOuJRGMSoUf'
      },
      {
        id: 4,
        title: 'Enterprise Software',
        desc: 'Virtualization, database management, and backup solutions to ensure business continuity and optimal software performance.',
        icon: 'dns',
        category: 'Software',
        brands: ['VMWare', 'Oracle', 'Veeam'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArw2sQmjraHOEloQVwXPxePym8QPfwAnuJc0WbXq7TVmm_wETqwbkhx-DTWjNMwE8EQhQA9cLbGjAbMpRaGVEEgzCA0l4R318PjMU9rlvtFVsiEt2tq3tWjdmol2i8MRTn-I4GE0hdNvE2OAitKcHnOrWDmtKoji6q6GewK_mFuZ1Pi3wEAaEO1Ft6VeGgTtCwgktY_1EKuE2uaouK5Qp0YHIBWbDKR__ZEV3rHjX9_Baj4Nt1gFPiBgf3rHJ-yZ9uGxzn7qpT0v_3'
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

    const jobApplications: JobApplicationPayload[] = [];

    return { solutions, jobs, team, partners, testimonials, products, enterpriseSoftware, jobApplications };
  }
}
