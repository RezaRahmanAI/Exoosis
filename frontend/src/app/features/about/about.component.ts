import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../core/services/brand.service';
import { TeamService } from '../../core/services/team.service';
import { TeamMember, Partner } from '../../core/models/entities';
import { AboutCoreValue, AboutMissionContent, PageHeroContent } from '../../core/models/catalog';
import { SettingsService } from '../../core/services/settings.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { PageHeroContentService } from '../../core/services/page-hero-content.service';
import { AboutMissionContentService } from '../../core/services/about-mission-content.service';
import { AboutCoreValueService } from '../../core/services/about-core-value.service';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  team: TeamMember[] = [];
  partners: Partner[] = [];
  pageHeroContent: PageHeroContent | null = null;
  missionContent: AboutMissionContent | null = null;
  coreValues: AboutCoreValue[] = [];
  
  fallbackMission = {
    eyebrow: 'Our Mission',
    title: 'Driving Digital Transformation',
    quote: 'Technology is the tool, but experience is the outcome. We focus on the outcome.',
    text1: 'At EXOSISTECH, we believe the future belongs to those who adapt. We are dedicated to providing scenario-oriented application experiences that drive the future of industry digitalization.',
    text2: 'By bridging the gap between complex hardware capabilities and real-world business needs, we ensure our partners stay ahead in a rapidly evolving tech landscape. Our commitment is not just to distribute technology, but to implement solutions that work.'
  };

  fallbackValues = [
    { title: 'Customer-Centric', icon: 'handshake', desc: 'We don\'t just sell products; we tailor solutions. Understanding the unique scenarios of each industry allows us to deliver personalized value.' },
    { title: 'Innovation', icon: 'lightbulb', desc: 'Staying on the bleeding edge of hardware and software advancements to ensure our clients have access to future-proof technologies.' },
    { title: 'Reliability', icon: 'shield_lock', desc: 'Building trust through a secure, consistent, and transparent distribution network that you can depend on, day in and day out.' }
  ];

  constructor(
    private teamService: TeamService,
    private brandService: BrandService,
    private settingsService: SettingsService,
    private pageHeroService: PageHeroContentService,
    private missionService: AboutMissionContentService,
    private coreValueService: AboutCoreValueService,
  ) {}

  ngOnInit() {
    this.pageHeroService
      .getActive('about')
      .pipe(
        take(1),
        catchError(() => of(null)),
      )
      .subscribe((data) => {
        this.pageHeroContent = data;
      });

    this.missionService
      .getActive()
      .pipe(
        take(1),
        catchError(() => of(null)),
      )
      .subscribe((data) => {
        this.missionContent = data;
      });

    this.coreValueService
      .getActive()
      .pipe(
        take(1),
        catchError(() => of([])),
      )
      .subscribe((data) => {
        this.coreValues = data;
      });

    this.teamService.getTeamMembers().subscribe(data => this.team = data.filter(member => member.isActive));
    this.brandService.getBrands().subscribe(data => this.partners = data.filter(partner => partner.isActive));
  }

  get leaders() {
    return this.team.filter(m => m.isLeadership && m.isActive);
  }

  get otherMinds() {
    return this.team.filter(m => !m.isLeadership && m.isActive);
  }

  get resolvedMission() {
    return this.missionContent ?? this.fallbackMission;
  }

  get resolvedCoreValues() {
    if (this.coreValues.length) {
      return this.coreValues.map((value) => ({
        title: value.title,
        icon: value.icon,
        desc: value.description,
      }));
    }
    return this.fallbackValues;
  }

  get settings$() {
    return this.settingsService.settings$;
  }
}
