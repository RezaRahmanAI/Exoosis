import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put<T>(path: string, body: object = {}): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  post<T>(path: string, body: object = {}): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${path}`)
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: HttpErrorResponse) {
    // Handle global error logic here
    console.error('API Error:', error);
    return throwError(() => error.error || 'Server error');
  }
}
