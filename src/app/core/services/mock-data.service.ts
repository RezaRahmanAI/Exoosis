import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Solution, Job, TeamMember, Partner } from '../models/entities';

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

    return { solutions, jobs, team, partners };
  }
}
