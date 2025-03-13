// // src/app/interceptors/auth.interceptor.ts
// import { Injectable } from '@angular/core';
// import { 
//   HttpInterceptor, 
//   HttpRequest, 
//   HttpHandler, 
//   HttpEvent,
//   HttpErrorResponse 
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthService } from './services/autentificacion/auth.service';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('authToken');
    
//     if (token) {
//       // Clonar la solicitud y añadir header de autorización
//       const clonedRequest = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token}`)
//       });
      
//       return next.handle(clonedRequest).pipe(
//         catchError((error: HttpErrorResponse) => {
//           if (error.status === 401) {
//             // Token inválido o expirado
//             this.authService.logout();
//             this.router.navigate(['/login']);
//           }
//           return throwError(error);
//         })
//       );
//     }
    
//     return next.handle(req);
//   }
// }


//leti

import { Injectable } from '@angular/core';
import { 
  HttpInterceptor, 
  HttpRequest, 
  HttpHandler, 
  HttpEvent,
  HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './services/autentificacion/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      
      return next.handle(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
    }
    
    return next.handle(req);
  }
}