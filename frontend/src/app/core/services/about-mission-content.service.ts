import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/api-response';
import { AboutMissionContent } from '../models/catalog';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AboutMissionContentService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private api: ApiService) {}

  getAll(): Observable<AboutMissionContent[]> {
    this.loadingSubject.next(true);
    return this.api.get<ApiResponse<AboutMissionContent[]>>('/AboutMissionContent').pipe(
      map((res) => res.data ?? []),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  getActive(): Observable<AboutMissionContent | null> {
    this.loadingSubject.next(true);
    return this.api.get<ApiResponse<AboutMissionContent>>('/AboutMissionContent/active').pipe(
      map((res) => res.data ?? null),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  create(payload: Partial<AboutMissionContent>): Observable<AboutMissionContent> {
    this.loadingSubject.next(true);
    return this.api.post<ApiResponse<AboutMissionContent>>('/AboutMissionContent', payload).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  update(id: string, payload: Partial<AboutMissionContent>): Observable<AboutMissionContent> {
    this.loadingSubject.next(true);
    return this.api.put<ApiResponse<AboutMissionContent>>(`/AboutMissionContent/${id}`, payload).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  delete(id: string): Observable<any> {
    this.loadingSubject.next(true);
    return this.api.delete<ApiResponse<any>>(`/AboutMissionContent/${id}`).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.message || 'Failed to handle about mission content.';
    this.errorSubject.next(message);
    return throwError(() => error);
  }
}
