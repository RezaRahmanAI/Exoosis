import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/api-response';
import { PageHeroContent } from '../models/catalog';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PageHeroContentService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private api: ApiService) {}

  getAll(): Observable<PageHeroContent[]> {
    this.loadingSubject.next(true);
    return this.api.get<ApiResponse<PageHeroContent[]>>('/PageHeroContent').pipe(
      map((res) => res.data ?? []),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  getActive(pageKey: string): Observable<PageHeroContent | null> {
    this.loadingSubject.next(true);
    return this.api.get<ApiResponse<PageHeroContent>>(`/PageHeroContent/active/${pageKey}`).pipe(
      map((res) => res.data ?? null),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  create(payload: Partial<PageHeroContent>): Observable<PageHeroContent> {
    this.loadingSubject.next(true);
    return this.api.post<ApiResponse<PageHeroContent>>('/PageHeroContent', payload).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  update(id: string, payload: Partial<PageHeroContent>): Observable<PageHeroContent> {
    this.loadingSubject.next(true);
    return this.api.put<ApiResponse<PageHeroContent>>(`/PageHeroContent/${id}`, payload).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  delete(id: string): Observable<any> {
    this.loadingSubject.next(true);
    return this.api.delete<ApiResponse<any>>(`/PageHeroContent/${id}`).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.message || 'Failed to handle page hero content.';
    this.errorSubject.next(message);
    return throwError(() => error);
  }
}
