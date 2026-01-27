import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private guestIdKey = 'exoosis_guest_id';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    let guestId = localStorage.getItem(this.guestIdKey);

    if (!guestId) {
      guestId = crypto.randomUUID();
      localStorage.setItem(this.guestIdKey, guestId);
    }

    headers = headers.set('X-Guest-Id', guestId);
    // Add Authorization header if token exists
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http
      .get<T>(`${this.apiUrl}${path}`, { params, headers: this.getHeaders() })
      .pipe(catchError(this.formatErrors));
  }

  put<T>(path: string, body: any = {}): Observable<T> {
    return this.http
      .put<T>(`${this.apiUrl}${path}`, body, { headers: this.getHeaders() })
      .pipe(catchError(this.formatErrors));
  }

  post<T>(path: string, body: any = {}): Observable<T> {
    return this.http
      .post<T>(`${this.apiUrl}${path}`, body, { headers: this.getHeaders() })
      .pipe(catchError(this.formatErrors));
  }

  delete<T>(path: string): Observable<T> {
    return this.http
      .delete<T>(`${this.apiUrl}${path}`, { headers: this.getHeaders() })
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: HttpErrorResponse) {
    // Handle global error logic here
    console.error('API Error:', error);
    return throwError(() => error.error || 'Server error');
  }
}
