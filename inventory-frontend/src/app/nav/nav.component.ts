import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import {Router,RouterModule } from '@angular/router';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  isAdmin(): boolean {
    const roles = JSON.parse(localStorage.getItem('userRoles') || '[]');
    return roles.includes('ROLE_ADMIN');
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
