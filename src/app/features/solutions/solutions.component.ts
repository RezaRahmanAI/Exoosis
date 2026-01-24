import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { Solution } from '../../core/models/entities';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.css'
})
export class SolutionsComponent implements OnInit {
  solutions: Solution[] = [];
  searchTerm = '';

  categories = [
    { title: 'IT Hardware', icon: 'computer', open: true, items: ['HP Enterprise', 'Dell Technologies', 'Asus Business', 'Lenovo'] },
    { title: 'Networking', icon: 'router', open: false, items: ['Cisco', 'Ruijie Networks', 'Ruckus', 'Aruba'] },
    { title: 'Security', icon: 'security', open: false, items: ['Hikvision', 'Dahua Technology', 'ZKTeco'] },
    { title: 'Software', icon: 'dns', open: false, items: ['VMWare', 'Oracle', 'Veeam'] }
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<Solution[]>('/solutions').subscribe(data => this.solutions = data);
  }

  get filteredSolutions() {
    if (!this.searchTerm) return this.solutions;
    return this.solutions.filter(s => 
      s.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      s.desc.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
