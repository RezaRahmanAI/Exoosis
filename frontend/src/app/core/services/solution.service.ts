import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, throwError } from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/api-response';
import { Solution } from '../models/entities';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private api: ApiService) {}

  getSolutions(industry?: string): Observable<Solution[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    let params = new HttpParams();
    if (industry) {
      params = params.set('industry', industry);
    }

    return this.api.get<ApiResponse<Solution[]>>('/solutions', params).pipe(
      map(response => response.data ?? []),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  getFeaturedSolutions(): Observable<Solution[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<Solution[]>>('/solutions/featured').pipe(
      map(response => response.data ?? []),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  getSolutionById(id: string): Observable<Solution> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<Solution>>(`/solutions/${id}`).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  createSolution(payload: Partial<Solution>): Observable<Solution> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.post<ApiResponse<Solution>>('/solutions', payload).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  updateSolution(id: string, payload: Partial<Solution>): Observable<Solution> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.put<ApiResponse<Solution>>(`/solutions/${id}`, payload).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  deleteSolution(id: string): Observable<string> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.delete<ApiResponse<string>>(`/solutions/${id}`).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.message || 'Failed to load solutions.';
    this.errorSubject.next(message);
    return throwError(() => error);
  }
}
