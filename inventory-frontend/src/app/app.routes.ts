import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsListComponent } from './products/products.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
export const routes: Routes = [
    { 
      path: 'home', 
      component: HomeComponent, 
      canActivate: [authGuard, roleGuard],
      data: { roles: ['ROLE_USER', 'ROLE_ADMIN']}
    },
    { 
      path: 'products', 
      component: ProductsListComponent,
      canActivate: [authGuard, roleGuard],
      data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] } 
    },
    { 
      path: 'admin', 
      component: AdminComponent,
      canActivate: [authGuard, roleGuard], 
      data: { roles: ['ROLE_ADMIN'] } 
    },
    { 
      path: 'login', 
      component: LoginComponent 
    },
    { 
      path: 'register', 
      component: RegisterComponent 
    },
    { 
      path: '**', 
      redirectTo: '/home' 
    }
  ];