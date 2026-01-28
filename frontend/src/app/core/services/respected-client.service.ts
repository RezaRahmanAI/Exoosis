import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize, map, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/api-response';
import { RespectedClient } from '../models/entities';

@Injectable({
  providedIn: 'root',
})
export class RespectedClientService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private api: ApiService) {}

  getClients(options: { includeInactive?: boolean } = {}): Observable<RespectedClient[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    let params = new HttpParams();
    if (options.includeInactive) {
      params = params.set('includeInactive', 'true');
    }

    return this.api.get<ApiResponse<RespectedClient[]>>('/respected-clients', params).pipe(
      map((response) => response.data ?? []),
      catchError((error) => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  getClientById(id: string): Observable<RespectedClient> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<RespectedClient>>(`/respected-clients/${id}`).pipe(
      map((response) => response.data),
      catchError((error) => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  createClient(payload: { name: string; logoUrl?: string | null; isActive?: boolean }): Observable<RespectedClient> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.post<ApiResponse<RespectedClient>>('/respected-clients', payload).pipe(
      map((response) => response.data),
      catchError((error) => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  updateClient(id: string, payload: { name: string; logoUrl?: string | null; isActive?: boolean }): Observable<RespectedClient> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.put<ApiResponse<RespectedClient>>(`/respected-clients/${id}`, payload).pipe(
      map((response) => response.data),
      catchError((error) => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  deleteClient(id: string): Observable<string> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.delete<ApiResponse<string>>(`/respected-clients/${id}`).pipe(
      map((response) => response.data),
      catchError((error) => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.message || 'Failed to load respected clients.';
    this.errorSubject.next(message);
    return throwError(() => error);
  }
}
