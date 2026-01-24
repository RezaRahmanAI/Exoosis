import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { TeamMember, Partner } from '../../core/models/entities';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  team: TeamMember[] = [];
  partners: Partner[] = [];
  
  mission = {
    quote: 'Technology is the tool, but experience is the outcome. We focus on the outcome.',
    text1: 'At EXOSISTECH, we believe the future belongs to those who adapt. We are dedicated to providing scenario-oriented application experiences that drive the future of industry digitalization.',
    text2: 'By bridging the gap between complex hardware capabilities and real-world business needs, we ensure our partners stay ahead in a rapidly evolving tech landscape. Our commitment is not just to distribute technology, but to implement solutions that work.'
  };

  values = [
    { title: 'Customer-Centric', icon: 'handshake', desc: 'We don\'t just sell products; we tailor solutions. Understanding the unique scenarios of each industry allows us to deliver personalized value.' },
    { title: 'Innovation', icon: 'lightbulb', desc: 'Staying on the bleeding edge of hardware and software advancements to ensure our clients have access to future-proof technologies.' },
    { title: 'Reliability', icon: 'shield_lock', desc: 'Building trust through a secure, consistent, and transparent distribution network that you can depend on, day in and day out.' }
  ];

  clients = [
    { name: 'Pubali Bank', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjwsIA0cEQU4-BnWhf7KCg0B92gAneQjMhOvvFplkDN85Sx5n_vZNUUrA4u-PyE6iO88T04KpbJf44_DeEtn08ru3O_QnyDbp59wg-YfeTtkpODsKzS2W361f6zWHNXF2L0JkrIEoLBdBBgXAW-fAr1VRnzJVb1YDAJKFFWD7K6jRROZs93qcq1KFZMglwTUCZx8Tz6qDDhWMCr48TwUaqidSdwEBaGK8tqM7s62AyE2-EMCjyb4Zc6BOQySv86JjRCwKOfv11oQVk' },
    { name: 'NCC Bank', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKHxOUKPcz7zkxPVwKYpv6au1nTVeUc97cUsafJnl59rd8AL0Lj8rLKseP1NsxOWwPLN0s9xcataahJDBCuJmzwPQP7XGy4127_kXsg27mF5UwsWcHQls6L-qI2TfFTaMq1kB4CDpP2ZNLEIwZ-hXTvBnwwPizfKKbXs7B-nupizYqEsX1AWqkHxd6ReYFKd9rBidiyMtB_Q60qHq-SmakP1n8ZCRSGpDa2AOuvn4xvrOzVDXE7pfxpZ6OhC-mBa0ni161zO25jAWC' },
    { name: 'Incepta Pharma', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8qDG66edMBzTaLSYAvHpK2dp1ZVMiLGINwEe1D-BRkJyIFQb3-s3FtarZ_Doq2sdjM3CzSPP0KRcK4yKZ_-o_ZC8i0yMyWFcfXSgBBPgLxJTMgjpq1PAcEwyNP8GLjHK7uHnHey1OJKhyjO--BBclGR6B_beysFNjSyvZsa8LgChGufY_uOdms6iMNOz61mPEJGRbwNsMKyv-GVMD8AuUNc_fTD6fqeLclyhYg-YXh0pwvZ3Jmlyaqiswhh6J3LMWVVzka9lidDu9' },
    { name: 'Pacific Pharma', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0nZ87eSEivNfEdOWYkAxMxHF6-jgBoRWRZJKUuR-yu-NkO9Obx4GPBSimwzTDiTDDlcPRCZP-qh4fwHSqHAkMhxJI9JlvsozN0yzJsANd9O2oZCAtHINEbaSQl5z59V97tn7qWPuJN9Xg1n1n92Ss2wYlgvoh1P-c3L7R3d_JkOgLoAM7YPzjbCVN2J3q54HfqBSJ975Yp2cJGCliDwayw-MD75-qPmmtwxxk4GMfR8vn3_I9LDVSbR55t9I7TIFSFmk_3atJcuhq' },
    { name: 'Bangladesh Eye Hospital', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZIkU8BlCJEySHIdv-thMIr145UO65KrHQKxILx_V11t5vNz2iWwA9pMZwuoFLy7k-2vzgPYpBJ2Kxq-mifx09lmOznRrRDLoxcxFriuATrTetvNhX4P1yGAW3iPjFUeW_TMxXYleTkyiGfZ87wzdKF-Yvdt28PgSFSsHRZEbAeW46v7tZGN3Suh2emvkRQuUMcw1POfWOZ3TuyvRNeopYp4xPTpJtbPGDcL9b89a-ek3bCz52R8Z78VCZNBRy6WoDANtXR8vvpUoo' },
    { name: 'Padma Bank', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ5XbVKhHMwf_XcCCzWfyaE7ESOIAMbvDy0x1p87scQYbSbLzS8ycMuEAnZebH2pTvCyZHkfTJnIq9U5tlPB29miwfGRBAq2naLob2sd8Ecfc_oMrcA2rfcsPjzaRnVpuHjdP9hDUpNLt--YwHbveeU4PpErSBdEDKr4bl-hL8kJ2HqOs31exmMnjv7PuIz-kZTUdXRjFwf5mdOwyI1vqO7RHWZRX2br86EJvR6kMS_rjlZ7X84rUnM6MW6gZNRgyXIJAAfQbcBLVt' },
    { name: 'Bangladesh Police', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt8SCYniong0KnxDtNACA_ohHxtLEcSZ09l_y8rGVVqdDfSfBCaj6BmOgMZgKvGGmkhZ7z3iqMint8lv4hMhMY21fOG9BqreGhqknsrCJeqiH7Ef7kcV0nMH6Zsr2_2yD01774uyCDYPAhU9e7oofEw8lfsedHRroSt9WnQTwm9VcKXb1y4uw8duGAKBx9nmIFW0nUc4Irq5bS9vJKYV1bbQk9ShLlrHFXzdXCurIIrv8I8IyBxNYfwniX0EtDvuAjhxfnJo2N0kTY' }
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<TeamMember[]>('/team').subscribe(data => this.team = data);
    this.api.get<Partner[]>('/partners').subscribe(data => this.partners = data);
  }

  get leaders() {
    return this.team.filter(m => m.isLeadership);
  }

  get otherMinds() {
    return this.team.filter(m => !m.isLeadership);
  }
}
