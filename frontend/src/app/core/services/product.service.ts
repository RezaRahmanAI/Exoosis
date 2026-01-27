import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize, map, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/api-response';
import { ApiProduct } from '../models/catalog';
import { ProductDetail } from '../models/entities';

export interface ProductQueryParams {
  search?: string;
  categoryId?: string;
  brandId?: string;
  sortBy?: string;
  sortDescending?: boolean;
  page?: number;
  pageSize?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private api: ApiService) {}

  getProducts(params?: ProductQueryParams): Observable<ProductDetail[]> {
    const httpParams = new HttpParams({
      fromObject: {
        ...(params?.search ? { search: params.search } : {}),
        ...(params?.categoryId ? { categoryId: params.categoryId } : {}),
        ...(params?.brandId ? { brandId: params.brandId } : {}),
        ...(params?.sortBy ? { sortBy: params.sortBy } : {}),
        ...(params?.sortDescending !== undefined ? { sortDescending: params.sortDescending } : {}),
        ...(params?.page ? { page: params.page } : {}),
        ...(params?.pageSize ? { pageSize: params.pageSize } : {})
      }
    });

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<ApiProduct[]>>('/products', httpParams).pipe(
      map(response => (response.data ?? []).map(product => this.mapProduct(product))),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  getCatalogProducts(params?: ProductQueryParams): Observable<ApiProduct[]> {
    const httpParams = new HttpParams({
      fromObject: {
        ...(params?.search ? { search: params.search } : {}),
        ...(params?.categoryId ? { categoryId: params.categoryId } : {}),
        ...(params?.brandId ? { brandId: params.brandId } : {}),
        ...(params?.sortBy ? { sortBy: params.sortBy } : {}),
        ...(params?.sortDescending !== undefined ? { sortDescending: params.sortDescending } : {}),
        ...(params?.page ? { page: params.page } : {}),
        ...(params?.pageSize ? { pageSize: params.pageSize } : {})
      }
    });

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<ApiProduct[]>>('/products', httpParams).pipe(
      map(response => response.data ?? []),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  getProductById(id: string): Observable<ProductDetail> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<ApiProduct>>(`/products/${id}`).pipe(
      map(response => this.mapProduct(response.data)),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  searchProducts(query: string, params?: Omit<ProductQueryParams, 'search'>): Observable<ProductDetail[]> {
    const httpParams = new HttpParams({
      fromObject: {
        q: query,
        ...(params?.categoryId ? { categoryId: params.categoryId } : {}),
        ...(params?.brandId ? { brandId: params.brandId } : {}),
        ...(params?.sortBy ? { sortBy: params.sortBy } : {}),
        ...(params?.sortDescending !== undefined ? { sortDescending: params.sortDescending } : {}),
        ...(params?.page ? { page: params.page } : {}),
        ...(params?.pageSize ? { pageSize: params.pageSize } : {})
      }
    });

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<ApiProduct[]>>('/products/search', httpParams).pipe(
      map(response => (response.data ?? []).map(product => this.mapProduct(product))),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  filterProducts(params?: ProductQueryParams): Observable<ProductDetail[]> {
    const httpParams = new HttpParams({
      fromObject: {
        ...(params?.search ? { search: params.search } : {}),
        ...(params?.categoryId ? { categoryId: params.categoryId } : {}),
        ...(params?.brandId ? { brandId: params.brandId } : {}),
        ...(params?.sortBy ? { sortBy: params.sortBy } : {}),
        ...(params?.sortDescending !== undefined ? { sortDescending: params.sortDescending } : {}),
        ...(params?.page ? { page: params.page } : {}),
        ...(params?.pageSize ? { pageSize: params.pageSize } : {})
      }
    });

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<ApiProduct[]>>('/products/filter', httpParams).pipe(
      map(response => (response.data ?? []).map(product => this.mapProduct(product))),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  getLowStock(threshold = 10): Observable<ProductDetail[]> {
    const httpParams = new HttpParams({ fromObject: { threshold } });

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.get<ApiResponse<ApiProduct[]>>('/products/low-stock', httpParams).pipe(
      map(response => (response.data ?? []).map(product => this.mapProduct(product))),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  createProduct(payload: {
    name: string;
    description?: string | null;
    price: number;
    categoryId: string;
    brandId: string;
    stockQuantity: number;
    imageUrls: string;
    isActive?: boolean;
  }): Observable<ProductDetail> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.post<ApiResponse<ApiProduct>>('/products', payload).pipe(
      map(response => this.mapProduct(response.data)),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  updateProduct(id: string, payload: {
    name: string;
    description?: string | null;
    price: number;
    categoryId: string;
    brandId: string;
    stockQuantity: number;
    imageUrls: string;
    isActive?: boolean;
  }): Observable<ProductDetail> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.put<ApiResponse<ApiProduct>>(`/products/${id}`, payload).pipe(
      map(response => this.mapProduct(response.data)),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  deleteProduct(id: string): Observable<string> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.api.delete<ApiResponse<string>>(`/products/${id}`).pipe(
      map(response => response.data),
      catchError(error => this.handleError(error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  private mapProduct(product: ApiProduct): ProductDetail {
    const imageUrl = product.imageUrls
      ? product.imageUrls.split(',').map(item => item.trim()).find(Boolean) ?? ''
      : '';

    return {
      id: product.id,
      name: product.name,
      category: product.categoryName ?? '',
      summary: product.description ?? '',
      price: product.price,
      priceUnit: '',
      brand: product.brandName ?? '',
      highlights: [],
      integrations: [],
      specs: [],
      pricingTiers: [],
      image: imageUrl
    };
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.message || 'Failed to load products.';
    this.errorSubject.next(message);
    return throwError(() => error);
  }
}
