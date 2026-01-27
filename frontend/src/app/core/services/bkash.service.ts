import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface BkashCreateResponse {
  paymentID: string;
  bkashURL: string;
  statusCode: string;
  statusMessage: string;
}

export interface BkashExecuteResponse {
  paymentID: string;
  trxID: string;
  transactionStatus: string;
  amount: string;
  merchantInvoiceNumber: string;
  statusCode: string;
  statusMessage: string;
}

@Injectable({
  providedIn: 'root',
})
export class BkashService {
  private apiUrl = `${environment.apiUrl}/bkash`;

  constructor(private http: HttpClient) {}

  createPayment(amount: number): Observable<BkashCreateResponse> {
    return this.http.post<BkashCreateResponse>(`${this.apiUrl}/create-payment`, { amount });
  }

  executePayment(paymentID: string): Observable<BkashExecuteResponse> {
    return this.http.get<BkashExecuteResponse>(`${this.apiUrl}/execute-payment`, {
      params: { paymentID },
    });
  }
}
