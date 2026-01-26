import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { ApiService } from './api.service';
import { Address, AuthResponse, LoginPayload, SignupPayload, User, UserApi } from '../models/entities';

type AuthResponse = {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
};

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

  updateProfile(updated: User): void {
    this.updateUser(updated);
    this.setSession(updated);
  }

  changePassword(userId: number, currentPassword: string, newPassword: string): Observable<AuthResponse> {
    const users = this.getUsers();
    const user = users.find(item => item.id === userId);
    if (!user || user.password !== currentPassword) {
      return of({ success: false, message: 'Current password is incorrect.' });
    }
    if (currentPassword === newPassword) {
      return of({ success: false, message: 'New password must be different.' });
    }
    user.password = newPassword;
    user.updatedAt = new Date().toISOString();
    this.saveUsers(users);
    this.setSession(user);
    return of({ success: true });
  }

  requestPasswordReset(email: string): Observable<AuthResponse> {
    const users = this.getUsers();
    const user = users.find(item => item.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return of({ success: false, message: 'No account found for this email.' });
    }
    const token = Math.random().toString(36).slice(2, 10);
    const tokens = this.getResetTokens();
    tokens[token] = user.id;
    localStorage.setItem(this.resetTokensKey, JSON.stringify(tokens));
    return of({ success: true, token });
  }

  resetPassword(token: string, newPassword: string): Observable<AuthResponse> {
    const tokens = this.getResetTokens();
    const userId = tokens[token];
    if (!userId) {
      return of({ success: false, message: 'Invalid or expired reset token.' });
    }
    const users = this.getUsers();
    const user = users.find(item => item.id === userId);
    if (!user) {
      return of({ success: false, message: 'User not found.' });
    }
    user.password = newPassword;
    user.updatedAt = new Date().toISOString();
    this.saveUsers(users);
    delete tokens[token];
    localStorage.setItem(this.resetTokensKey, JSON.stringify(tokens));
    return of({ success: true });
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

  private setSession(user: User) {
    this.userSubject.next(user);
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    localStorage.setItem(this.tokenKey, `token-${user.id}-${Date.now()}`);
  }

  private updateUser(updated: User) {
    const users = this.getUsers();
    const index = users.findIndex(item => item.id === updated.id);
    if (index !== -1) {
      users[index] = { ...updated, updatedAt: new Date().toISOString() };
      this.saveUsers(users);
    }
  }

  private getUsers(): User[] {
    const stored = localStorage.getItem(this.usersKey);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as User[];
  }

  private saveUsers(users: User[]) {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  private ensureSeedAdmin() {
    const users = this.getUsers();
    const adminExists = users.some(user => user.role === 'Admin');
    if (!adminExists) {
      const now = new Date().toISOString();
      users.push({
        id: Date.now(),
        name: 'Exosistech Admin',
        email: 'sales@exosistech.com',
        password: 'Admin@321',
        role: 'Admin',
        phoneNumber: '',
        createdAt: now,
        updatedAt: now,
        lastLoginAt: now,
        emailVerified: true
      });
      this.saveUsers(users);
    }
  }

  private getResetTokens(): Record<string, number> {
    const stored = localStorage.getItem(this.resetTokensKey);
    if (!stored) {
      return {};
    }
    return JSON.parse(stored) as Record<string, number>;
  }
}
