import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../shared/api-endpoints';
import { Observable, tap } from 'rxjs';
import { Token } from '@angular/compiler';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: string;
  roles: string[];
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 
  }

  login(user: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(API_ENDPOINTS.AUTH.LOGIN, user).pipe(
      tap(({ token }) => {
        const decodedToken: any = jwtDecode(token);
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRoles', JSON.stringify(decodedToken.roles));
      })
    );
  }

  isUserInRole(role:string): boolean{
    const roles = JSON.parse(localStorage.getItem('userRoles') || '[]');
    return roles.includes(role);
  }

  register(user: any): Observable<any> {
    return this.http.post(API_ENDPOINTS.AUTH.REGISTER, user);
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  
  getUser(): DecodedToken | null {
    const token = localStorage.getItem('authToken');
    if (!token) return null; 
    try {
      const decodedToken: DecodedToken = jwtDecode(token); 
      return decodedToken; 
    } catch (error) {
      console.error("Error decodificando el token", error);
      return null;
    }
  }
}
