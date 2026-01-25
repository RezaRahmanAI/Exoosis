import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { TeamMember, Partner, MissionStatement, CompanyValue, ClientLogo } from '../../core/models/entities';

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
  
  mission: MissionStatement = {
    id: 0,
    quote: '',
    text1: '',
    text2: ''
  };
  values: CompanyValue[] = [];
  clients: ClientLogo[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<TeamMember[]>('/team').subscribe(data => this.team = data);
    this.api.get<Partner[]>('/partners').subscribe(data => this.partners = data);
    this.api.get<MissionStatement[]>('/missionStatements').subscribe(data => {
      this.mission = data[0] ?? this.mission;
    });
    this.api.get<CompanyValue[]>('/companyValues').subscribe(data => this.values = data);
    this.api.get<ClientLogo[]>('/clients').subscribe(data => this.clients = data);
  }

  get leaders() {
    return this.team.filter(m => m.isLeadership);
  }

  get otherMinds() {
    return this.team.filter(m => !m.isLeadership);
  }
}
