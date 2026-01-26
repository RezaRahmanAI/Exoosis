import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { WebsiteSettings } from '../models/entities';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsKey = 'exoosis-settings';
  private settingsSubject = new BehaviorSubject<WebsiteSettings>(this.loadSettings());
  settings$ = this.settingsSubject.asObservable();

  getPublicSettings() {
    return this.settings$.pipe(map(settings => settings));
  }

  getAllSettings() {
    return this.settings$.pipe(map(settings => settings));
  }

  updateSettings(settings: WebsiteSettings) {
    this.settingsSubject.next(settings);
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
  }

  getSettingsSnapshot() {
    return this.settingsSubject.value;
  }

  private loadSettings(): WebsiteSettings {
    const stored = localStorage.getItem(this.settingsKey);
    if (stored) {
      return JSON.parse(stored) as WebsiteSettings;
    }
    const defaultSettings: WebsiteSettings = {
      general: {
        websiteName: 'EXOSISTECH',
        tagline: 'Enterprise IT & Digital Transformation',
        logoUrl: 'logo.png',
        footerLogoUrl: 'logo.png',
        faviconUrl: 'logo.png',
        defaultLanguage: 'en',
        currency: 'USD',
        timezone: 'Asia/Dhaka'
      },
      contact: {
        address: 'Rahmania International Complex',
        city: 'Motijheel',
        state: 'Dhaka',
        postalCode: '1000',
        country: 'Bangladesh',
        primaryPhone: '+880 1234 567890',
        secondaryPhone: '+880 9876 543210',
        supportPhone: '+880 1111 222333',
        generalEmail: 'hello@exosistech.com',
        salesEmail: 'sales@exosistech.com',
        supportEmail: 'support@exosistech.com'
      },
      social: {
        facebookUrl: 'https://facebook.com',
        twitterUrl: 'https://twitter.com',
        linkedinUrl: 'https://linkedin.com',
        instagramUrl: 'https://instagram.com',
        youtubeUrl: 'https://youtube.com'
      },
      business: {
        description: 'Leading the way in enterprise IT solutions and digital transformation for global businesses.',
        foundedYear: 2012,
        registrationNumber: 'EXO-REG-2012',
        taxId: 'TAX-EXO-5522',
        workingHours: 'Sun-Thu: 9:00 AM - 7:00 PM',
        paymentMethods: ['Visa', 'Mastercard', 'PayPal', 'Bank Transfer']
      },
      seo: {
        defaultMetaTitle: 'EXOSISTECH | Enterprise IT Solutions',
        defaultMetaDescription: 'Enterprise-grade hardware, networking, and digital transformation services.',
        metaKeywords: 'enterprise IT, hardware, networking, security, digital transformation',
        googleAnalyticsId: '',
        facebookPixelId: '',
        googleTagManagerId: ''
      }
    };
    localStorage.setItem(this.settingsKey, JSON.stringify(defaultSettings));
    return defaultSettings;
  }
}
