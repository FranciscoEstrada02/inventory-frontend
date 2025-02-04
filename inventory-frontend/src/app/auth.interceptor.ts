// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtén el token desde el localStorage
  const token = localStorage.getItem('authToken');

  // Verifica si la solicitud es de login o registro (no necesitas agregar el token allí)
  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next(req);
  }

  // Si el token está presente, añade el token al encabezado de la solicitud
  if (token && typeof token === 'string') {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(clonedReq);
  } else {
    console.log('No se añadió token a la solicitud. Token no encontrado o inválido.');
  }

  return next(req); // Si no hay token, simplemente pasa la solicitud sin modificarla
};
