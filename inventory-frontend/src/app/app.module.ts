// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor'; // Ruta correcta a tu interceptor
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
    imports: [
      BrowserModule,
      RouterModule.forRoot(routes)
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useFactory: authInterceptor,
        multi: true,
      }
    ],
  })
  export class AppModule {}
