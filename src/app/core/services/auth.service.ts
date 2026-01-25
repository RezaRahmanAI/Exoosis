import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/entities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map(user => !!user));

  constructor(private api: ApiService) {
    const stored = localStorage.getItem('exoosis-user');
    if (stored) {
      this.userSubject.next(JSON.parse(stored));
    }
  }

  login(email: string, password: string) {
    return this.api.get<User[]>('/users').pipe(
      map(users => users.find(user => user.email === email && user.password === password) || null),
      tap(user => {
        if (user) {
          this.userSubject.next(user);
          localStorage.setItem('exoosis-user', JSON.stringify(user));
        }
      })
    );
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('exoosis-user');
    return of(true);
  }
}
