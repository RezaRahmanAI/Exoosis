import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/api-response';
import { AboutCoreValue } from '../models/catalog';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AboutCoreValueService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private api: ApiService) {}

  getAll(): Observable<AboutCoreValue[]> {
    this.loadingSubject.next(true);
    return this.api.get<ApiResponse<AboutCoreValue[]>>('/AboutCoreValue').pipe(
      map((res) => res.data ?? []),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  getActive(): Observable<AboutCoreValue[]> {
    this.loadingSubject.next(true);
    return this.api.get<ApiResponse<AboutCoreValue[]>>('/AboutCoreValue/active').pipe(
      map((res) => res.data ?? []),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  create(payload: Partial<AboutCoreValue>): Observable<AboutCoreValue> {
    this.loadingSubject.next(true);
    return this.api.post<ApiResponse<AboutCoreValue>>('/AboutCoreValue', payload).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  update(id: string, payload: Partial<AboutCoreValue>): Observable<AboutCoreValue> {
    this.loadingSubject.next(true);
    return this.api.put<ApiResponse<AboutCoreValue>>(`/AboutCoreValue/${id}`, payload).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  delete(id: string): Observable<any> {
    this.loadingSubject.next(true);
    return this.api.delete<ApiResponse<any>>(`/AboutCoreValue/${id}`).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.message || 'Failed to handle about core value content.';
    this.errorSubject.next(message);
    return throwError(() => error);
  }
}
