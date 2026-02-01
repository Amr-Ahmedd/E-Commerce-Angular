import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponseDto } from '../../models/product-response';

@Injectable({ providedIn: 'root' })
export class AdminProductService {
  private API = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  //  search via backend (OpenFoodFacts)
  searchProductsByName(query: string): Observable<ProductResponseDto[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<ProductResponseDto[]>(
      `${this.API}/admin/products/search`,
      { params }
    );
  }

  //  list approved products (public endpoint you gave)
  getApprovedProducts(): Observable<ProductResponseDto[]> {
    return this.http.get<ProductResponseDto[]>(`${this.API}/products`);
  }

  //  approve product
  approveProduct(product: ProductResponseDto): Observable<ProductResponseDto> {
    return this.http.post<ProductResponseDto>(
      `${this.API}/admin/products/approve`,
      product
    );
  }

  //  delete approved product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/admin/products/${id}`);
  }
}
