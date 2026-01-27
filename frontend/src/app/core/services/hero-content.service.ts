import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/api-response';
import { HeroContent } from '../models/catalog';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroContentService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private api: ApiService) {}

  getAll(): Observable<HeroContent[]> {
    this.loadingSubject.next(true);
    return this.api.get<ApiResponse<HeroContent[]>>('/HeroContent').pipe(
      map((res) => res.data ?? []),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  getActive(): Observable<HeroContent | null> {
    this.loadingSubject.next(true);
    return this.api.get<ApiResponse<HeroContent>>('/HeroContent/active').pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  create(payload: Partial<HeroContent>): Observable<HeroContent> {
    this.loadingSubject.next(true);
    return this.api.post<ApiResponse<HeroContent>>('/HeroContent', payload).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  update(id: string, payload: Partial<HeroContent>): Observable<HeroContent> {
    this.loadingSubject.next(true);
    return this.api.put<ApiResponse<HeroContent>>(`/HeroContent/${id}`, payload).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  delete(id: string): Observable<any> {
    this.loadingSubject.next(true);
    return this.api.delete<ApiResponse<any>>(`/HeroContent/${id}`).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.message || 'Failed to handle hero content.';
    this.errorSubject.next(message);
    return throwError(() => error);
  }
}
