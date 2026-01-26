import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { ApiService } from './api.service';
import { Address, AuthResponse, LoginPayload, SignupPayload, User, UserApi } from '../models/entities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map(user => !!user));

  private currentUserKey = 'exoosis-user';
  private tokenKey = 'exoosis_auth_token';

  constructor(private api: ApiService) {
    const stored = localStorage.getItem(this.currentUserKey);
    if (stored) {
      this.userSubject.next(JSON.parse(stored));
    }

    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.api.get<UserApi>('/auth/me').subscribe({
        next: user => this.setSession(this.normalizeUser(user), token),
        error: () => this.clearSession()
      });
    }
  }

  login(identifier: string, password: string, rememberMe = true): Observable<User | null> {
    const payload: LoginPayload = { identifier, password, rememberMe };
    return this.api.post<AuthResponse>('/auth/login', payload).pipe(
      tap(response => this.setSession(this.normalizeUser(response.user), response.token)),
      map(response => this.normalizeUser(response.user)),
      catchError(() => of(null))
    );
  }

  signup(payload: SignupPayload): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/auth/signup', payload).pipe(
      tap(response => this.setSession(this.normalizeUser(response.user), response.token))
    );
  }

  logout(): Observable<boolean> {
    return this.api.post('/auth/logout').pipe(
      tap(() => this.clearSession()),
      map(() => true),
      catchError(() => {
        this.clearSession();
        return of(true);
      })
    );
  }

  updateProfile(updated: User): Observable<User> {
    const payload = {
      fullName: updated.fullName,
      email: updated.email,
      phoneNumber: updated.phoneNumber,
      profilePhotoUrl: updated.profilePhotoUrl,
      street: updated.address?.street,
      city: updated.address?.city,
      state: updated.address?.state,
      postalCode: updated.address?.postalCode,
      country: updated.address?.country,
      dateOfBirth: updated.dateOfBirth,
      gender: updated.gender
    };

    return this.api.put<UserApi>('/users/profile', payload).pipe(
      map(user => this.normalizeUser(user)),
      tap(user => this.setSession(user, localStorage.getItem(this.tokenKey) || ''))
    );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<{ success: boolean; message?: string }> {
    const user = this.userSubject.value;
    const endpoint = user?.role === 'Admin' ? '/admin/change-password' : '/users/change-password';
    return this.api.put(endpoint, { currentPassword, newPassword }).pipe(
      map(() => ({ success: true })),
      catchError(error => of({ success: false, message: error }))
    );
  }

  requestPasswordReset(email: string): Observable<{ success: boolean; token?: string; message?: string }> {
    return this.api.post<{ message: string; token: string }>('/auth/forgot-password', { email }).pipe(
      map(response => ({ success: true, token: response.token })),
      catchError(error => of({ success: false, message: error }))
    );
  }

  resetPassword(token: string, newPassword: string): Observable<{ success: boolean; message?: string }> {
    return this.api.post('/auth/reset-password', { token, newPassword }).pipe(
      map(() => ({ success: true })),
      catchError(error => of({ success: false, message: error }))
    );
  }

  getCurrentUser() {
    return this.userSubject.value;
  }

  isAdmin(user?: User | null) {
    const current = user ?? this.userSubject.value;
    return current?.role === 'Admin';
  }

  isAuthenticated() {
    return !!this.userSubject.value;
  }

  private setSession(user: User, token: string) {
    this.userSubject.next(user);
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  private clearSession() {
    this.userSubject.next(null);
    localStorage.removeItem(this.currentUserKey);
    localStorage.removeItem(this.tokenKey);
  }

  private normalizeUser(user: UserApi): User {
    const address: Address = {
      street: user.addressStreet,
      city: user.addressCity,
      state: user.addressState,
      postalCode: user.addressPostalCode,
      country: user.addressCountry
    };

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profilePhotoUrl: user.profilePhotoUrl,
      address,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      lastLoginAt: user.lastLoginAt,
      emailVerified: user.emailVerified
    };
  }
}
