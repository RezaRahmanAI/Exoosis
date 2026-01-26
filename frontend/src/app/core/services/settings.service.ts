import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { WebsiteSettings } from '../models/entities';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsSubject = new BehaviorSubject<WebsiteSettings | null>(null);
  settings$ = this.settingsSubject.asObservable();

  constructor(private api: ApiService) {
    this.fetchPublicSettings().subscribe();
  }

  getPublicSettings(): Observable<WebsiteSettings> {
    return this.api.get<WebsiteSettings>('/settings/public').pipe(
      tap(settings => this.settingsSubject.next(settings))
    );
  }

  getAllSettings(): Observable<WebsiteSettings> {
    return this.api.get<WebsiteSettings>('/settings').pipe(
      tap(settings => this.settingsSubject.next(settings))
    );
  }

  updateSettings(settings: WebsiteSettings): Observable<WebsiteSettings> {
    return this.api.put<WebsiteSettings>('/settings', settings).pipe(
      tap(updated => this.settingsSubject.next(updated))
    );
  }

  getSettingsSnapshot(): WebsiteSettings | null {
    return this.settingsSubject.value;
  }

  private fetchPublicSettings(): Observable<WebsiteSettings> {
    return this.getPublicSettings();
  }
}
