import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponseDto } from '../../models/product-response';

const BASE_URL = 'http://localhost:8081';

@Injectable({
  providedIn: 'root',
})
export class CustomerProductService {
  constructor(private http: HttpClient) {}

  getApprovedProducts(): Observable<ProductResponseDto[]> {
    return this.http.get<ProductResponseDto[]>(`${BASE_URL}/api/products`);
  }

  getProductById(id: number): Observable<ProductResponseDto> {
    return this.http.get<ProductResponseDto>(`${BASE_URL}/api/products/${id}`);
  }
}
