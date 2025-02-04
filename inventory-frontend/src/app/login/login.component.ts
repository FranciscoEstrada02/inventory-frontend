import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {username: '', password: ''};
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(){
    this.authService.login(this.user).subscribe({
      next: () =>{
        this.router.navigate(['/products'])
      },
      error: (err) =>{
        this.errorMessage = 'User or password incorrect';
        console.error(err)
      }
    })
  }
  
  
}
