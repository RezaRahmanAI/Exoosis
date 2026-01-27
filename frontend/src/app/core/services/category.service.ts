import { Injectable } from '@angular/core';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize, map, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/api-response';
import { ApiCategory } from '../models/catalog';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private api: ApiService) {}

  getCategories(params?: {
    search?: string;
    page?: number;
    pageSize?: number;
  }): Observable<ApiCategory[]> {
    const httpParams = new HttpParams({
      fromObject: {
        ...(params?.search ? { search: params.search } : {}),
        ...(params?.page ? { page: params.page } : {}),
        ...(params?.pageSize ? { pageSize: params.pageSize } : {}),
      },
    });

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<ApiCategory[]>>('/categories', httpParams).pipe(
      map((response) => response.data ?? []),
      catchError((error) => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  getCategoryById(id: string): Observable<ApiCategory> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<ApiCategory>>(`/categories/${id}`).pipe(
      map((response) => response.data),
      catchError((error) => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  createCategory(payload: {
    name: string;
    description?: string | null;
    isActive?: boolean;
    imageUrl?: string | null;
  }): Observable<ApiCategory> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.post<ApiResponse<ApiCategory>>('/categories', payload).pipe(
      map((response) => response.data),
      catchError((error) => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  updateCategory(
    id: string,
    payload: {
      name: string;
      description?: string | null;
      isActive?: boolean;
      imageUrl?: string | null;
    },
  ): Observable<ApiCategory> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.put<ApiResponse<ApiCategory>>(`/categories/${id}`, payload).pipe(
      map((response) => response.data),
      catchError((error) => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  deleteCategory(id: string): Observable<string> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.delete<ApiResponse<string>>(`/categories/${id}`).pipe(
      map((response) => response.data),
      catchError((error) => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.message || 'Failed to load categories.';
    this.errorSubject.next(message);
    return throwError(() => error);
  }
}
