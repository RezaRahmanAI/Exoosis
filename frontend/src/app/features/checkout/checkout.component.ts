import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BkashService } from '../../core/services/bkash.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 pt-20 pb-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div class="p-8 md:p-12 text-center">
            <h1 class="text-3xl font-extrabold text-navy-blue mb-4">Complete Your Purchase</h1>
            <p class="text-gray-500 mb-12">
              Select your preferred payment method to finalize the order.
            </p>

            <div class="max-w-md mx-auto space-y-4">
              <button
                (click)="payWithBkash()"
                [disabled]="loading"
                class="w-full flex items-center justify-between p-6 bg-pink-50 rounded-2xl border-2 border-transparent hover:border-pink-500 transition-all group"
              >
                <div class="flex items-center gap-4">
                  <img
                    src="https://luna-oss.obs.ap-southeast-3.myhuaweicloud.com/bangladesh/bkash-logo.svg"
                    alt="bKash"
                    class="h-10"
                  />
                  <span class="text-lg font-bold text-gray-800">Pay with bKash</span>
                </div>
                <span
                  class="material-symbols-outlined text-pink-500 group-hover:translate-x-1 transition-transform"
                  >arrow_forward</span
                >
              </button>

              <div *ngIf="loading" class="flex flex-col items-center gap-4 mt-8">
                <div
                  class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"
                ></div>
                <p class="text-sm font-medium text-gray-500">Redirecting to secure gateway...</p>
              </div>

              <div
                *ngIf="errorMessage"
                class="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold mt-4"
              >
                {{ errorMessage }}
              </div>
            </div>
          </div>
        </div>

        <!-- Callback Handling State -->
        <div
          *ngIf="paymentStatus"
          class="mt-8 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center"
        >
          <div *ngIf="paymentStatus === 'success'" class="space-y-4">
            <div
              class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="material-symbols-outlined text-green-600 text-3xl">check</span>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">Payment Successful!</h2>
            <p class="text-gray-500">
              Your transaction ID: <span class="font-bold text-gray-800">{{ trxID }}</span>
            </p>
            <button
              routerLink="/"
              class="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all"
            >
              Return Home
            </button>
          </div>

          <div *ngIf="paymentStatus === 'failed'" class="space-y-4">
            <div
              class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="material-symbols-outlined text-red-600 text-3xl">close</span>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">Payment Failed</h2>
            <p class="text-gray-500">
              Something went wrong with your transaction. Please try again.
            </p>
            <button
              (click)="paymentStatus = null"
              class="px-8 py-3 bg-gray-800 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CheckoutComponent implements OnInit {
  loading = false;
  errorMessage = '';
  paymentStatus: 'success' | 'failed' | 'cancel' | null = null;
  trxID = '';

  constructor(
    private bkashService: BkashService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    // Handle bKash Callback
    this.route.queryParams.subscribe((params) => {
      const status = params['status'];
      const paymentID = params['paymentID'];

      if (status === 'success' && paymentID) {
        this.executePayment(paymentID);
      } else if (status === 'failure' || status === 'cancel') {
        this.paymentStatus = 'failed';
      }
    });
  }

  payWithBkash() {
    this.loading = true;
    this.errorMessage = '';

    // Get total from cart service - using mock user for now
    this.cartService.getCart('user-123').subscribe({
      next: (cart) => {
        const amount = Math.round(cart.grandTotal * 1.1); // Including 10% tax as per cart page

        if (amount <= 0) {
          this.errorMessage = 'Cart total must be greater than zero to proceed with payment.';
          this.loading = false;
          return;
        }

        this.bkashService.createPayment(amount).subscribe({
          next: (res) => {
            if (res.bkashURL) {
              window.location.href = res.bkashURL;
            } else {
              this.errorMessage = 'Failed to get payment URL';
              this.loading = false;
            }
          },
          error: (err) => {
            console.error('Payment Error:', err);
            this.errorMessage =
              typeof err.error === 'string'
                ? err.error
                : err.error?.message || err.error?.detail || err.message || 'Connection error';
            this.loading = false;
          },
        });
      },
      error: () => {
        this.errorMessage = 'Failed to load cart total';
        this.loading = false;
      },
    });
  }

  private executePayment(paymentID: string) {
    this.loading = true;
    this.bkashService.executePayment(paymentID).subscribe({
      next: (res) => {
        if (res.statusCode === '0000' || res.transactionStatus === 'Completed') {
          this.paymentStatus = 'success';
          this.trxID = res.trxID;
        } else {
          this.paymentStatus = 'failed';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Execution Error:', err);
        this.paymentStatus = 'failed';
        typeof err.error === 'string' ? err.error : err.error?.message || 'Execution failed';
        this.loading = false;
      },
    });
  }
}
