// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../shared/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    
    return this.http.get<any[]>(API_ENDPOINTS.PRODUCTS.GET_ALL);
  }
}