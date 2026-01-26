import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { User } from '../models/entities';

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

  private usersKey = 'exoosis-users';
  private currentUserKey = 'exoosis-user';
  private tokenKey = 'exoosis_auth_token';
  private resetTokensKey = 'exoosis-reset-tokens';

  constructor() {
    this.ensureSeedAdmin();
    const stored = localStorage.getItem(this.currentUserKey);
    if (stored) {
      this.userSubject.next(JSON.parse(stored));
    }
  }

  login(emailOrUsername: string, password: string): Observable<User | null> {
    const users = this.getUsers();
    const normalized = emailOrUsername.trim().toLowerCase();
    const user = users.find(storedUser => {
      const isAdminUsernameMatch = storedUser.role === 'Admin' && normalized === 'exosistech';
      const isEmailMatch = storedUser.email.toLowerCase() === normalized;
      return (isEmailMatch || isAdminUsernameMatch) && storedUser.password === password;
    }) || null;
    if (user) {
      const updatedUser = { ...user, lastLoginAt: new Date().toISOString() };
      this.updateUser(updatedUser);
      this.setSession(updatedUser);
      return of(updatedUser);
    }
    return of(null);
  }

  signup(payload: Omit<User, 'id' | 'role' | 'createdAt' | 'updatedAt' | 'lastLoginAt'>): Observable<AuthResponse> {
    const users = this.getUsers();
    const exists = users.some(user => user.email.toLowerCase() === payload.email.toLowerCase());
    if (exists) {
      return of({ success: false, message: 'Email already exists.' });
    }
    const now = new Date().toISOString();
    const newUser: User = {
      ...payload,
      id: Date.now(),
      role: 'User',
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
      emailVerified: false
    };
    users.push(newUser);
    this.saveUsers(users);
    this.setSession(newUser);
    return of({ success: true, user: newUser });
  }

  logout(): Observable<boolean> {
    this.userSubject.next(null);
    localStorage.removeItem(this.currentUserKey);
    localStorage.removeItem(this.tokenKey);
    return of(true);
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
