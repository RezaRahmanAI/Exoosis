import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/api-response';
import { TeamMember } from '../models/entities';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private api: ApiService) {}

  getTeamMembers(): Observable<TeamMember[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<TeamMember[]>>('/team-members').pipe(
      map(response => response.data ?? []),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  getTeamMembersBySection(section: 'leadership' | 'team'): Observable<TeamMember[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<TeamMember[]>>(`/team-members/by-section/${section}`).pipe(
      map(response => response.data ?? []),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  getTeamMemberById(id: string): Observable<TeamMember> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<TeamMember>>(`/team-members/${id}`).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  createTeamMember(payload: Partial<TeamMember>): Observable<TeamMember> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.post<ApiResponse<TeamMember>>('/team-members', payload).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  updateTeamMember(id: string, payload: Partial<TeamMember>): Observable<TeamMember> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.put<ApiResponse<TeamMember>>(`/team-members/${id}`, payload).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  deleteTeamMember(id: string): Observable<string> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.delete<ApiResponse<string>>(`/team-members/${id}`).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.message || 'Failed to load team members.';
    this.errorSubject.next(message);
    return throwError(() => error);
  }
}
