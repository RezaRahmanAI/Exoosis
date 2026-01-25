import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize, map, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/api-response';
import { ApiBrand } from '../models/catalog';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private api: ApiService) {}

  getBrands(): Observable<ApiBrand[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<ApiBrand[]>>('/brands').pipe(
      map(response => response.data ?? []),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  getBrandById(id: string): Observable<ApiBrand> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<ApiBrand>>(`/brands/${id}`).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  createBrand(payload: { name: string; description?: string | null; logoUrl?: string | null; isActive?: boolean }): Observable<ApiBrand> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.post<ApiResponse<ApiBrand>>('/brands', payload).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  updateBrand(id: string, payload: { name: string; description?: string | null; logoUrl?: string | null; isActive?: boolean }): Observable<ApiBrand> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.put<ApiResponse<ApiBrand>>(`/brands/${id}`, payload).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  deleteBrand(id: string): Observable<string> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.delete<ApiResponse<string>>(`/brands/${id}`).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.message || 'Failed to load brands.';
    this.errorSubject.next(message);
    return throwError(() => error);
  }
}
