import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../shared/api-endpoints';
import { Observable, tap } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = ''

  constructor(private http:HttpClient) { 
  }

  login(user:any): Observable<string>{
    return this.http.post<string>(API_ENDPOINTS.AUTH.LOGIN, user).pipe(
      tap((response: any) =>{
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        } else {
          console.error('No se recibió token en la respuesta');
        } 
      })
    )
  }
  register(user: any): Observable<any> {
    return this.http.post(API_ENDPOINTS.AUTH.REGISTER, user);
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Eliminar token al cerrar sesión
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Devuelve true si hay un token guardado
  }
}
