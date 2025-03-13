// // src/app/services/auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private url = 'http://localhost:9000/auth'; // URL de tu backend
//   private currentUserSubject = new BehaviorSubject<any>(null);
//   public currentUser$ = this.currentUserSubject.asObservable();

//   constructor(private http: HttpClient) {
//     // Inicializar el usuario desde el token almacenado
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       this.decodeToken(token);
//     }
//   }

//   login(email: string, password: string): Observable<any> {
//     return this.http.post(`${this.url}/login`, { email, password }).pipe(
//       tap(response => {
//         // Guardar token
//         localStorage.setItem('authToken', response.token);
//         // Decodificar y establecer usuario actual
//         this.decodeToken(response.token);
//       })
//     );
//   }

//   logout() {
//     // Limpiar token y usuario actual
//     localStorage.removeItem('authToken');
//     this.currentUserSubject.next(null);
//   }

//   private decodeToken(token: string) {
//     try {
//       // Decodificar payload del token
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       this.currentUserSubject.next({
//         email: payload.sub,
//         role: payload.role
//       });
//     } catch (error) {
//       console.error('Error al decodificar token', error);
//       this.logout();
//     }
//   }

//   getUserRole(): string | null {
//     const currentUser = this.currentUserSubject.getValue();
//     return currentUser ? currentUser.role : null;
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('authToken');
//   }
// }


//segundo try 


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private url = 'http://localhost:9000/auth';
//   private currentUserSubject = new BehaviorSubject<any>(null);
//   public currentUser$ = this.currentUserSubject.asObservable();

//   constructor(private http: HttpClient) {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       this.decodeToken(token);
//     }
//   }

//   login(email: string, password: string): Observable<any> {
//     return this.http.post<any>(`${this.url}/login`, { email, password }).pipe(
//       tap((response: any) => {
//         localStorage.setItem('authToken', response.token);
//         this.decodeToken(response.token);
//       })
//     );
//   }

//   logout() {
//     localStorage.removeItem('authToken');
//     this.currentUserSubject.next(null);
//   }

//   private decodeToken(token: string) {
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       this.currentUserSubject.next({
//         email: payload.sub,
//         role: payload.role
//       });
//     } catch (error) {
//       console.error('Error al decodificar token', error);
//       this.logout();
//     }
//   }

//   getUserRole(): string | null {
//     const currentUser = this.currentUserSubject.getValue();
//     return currentUser ? currentUser.role : null;
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('authToken');
//   }
// }


// tercer try

// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private url = 'http://localhost:9000/auth';
//   private currentUserSubject = new BehaviorSubject<any>(null);
//   public currentUser$ = this.currentUserSubject.asObservable();

//   constructor(
//     private http: HttpClient,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {
//     this.initializeToken();
//   }

//   private initializeToken() {
//     if (this.isBrowser()) {
//       const token = localStorage.getItem('authToken');
//       if (token) {
//         this.decodeToken(token);
//       }
//     }
//   }

//   private isBrowser(): boolean {
//     return isPlatformBrowser(this.platformId);
//   }

//   login(email: string, password: string): Observable<any> {
//     return this.http.post<any>(`${this.url}/login`, { email, password }).pipe(
//       tap((response: any) => {
//         if (this.isBrowser()) {
//           localStorage.setItem('authToken', response.token);
//           this.decodeToken(response.token);
//         }
//       })
//     );
//   }

//   logout() {
//     if (this.isBrowser()) {
//       localStorage.removeItem('authToken');
//     }
//     this.currentUserSubject.next(null);
//   }

//   // private decodeToken(token: string) {
//   //   try {
//   //     const payload = JSON.parse(atob(token.split('.')[1]));
//   //     this.currentUserSubject.next({
//   //       email: payload.sub,
//   //       role: payload.role
//   //     });
//   //   } catch (error) {
//   //     console.error('Error al decodificar token', error);
//   //     this.logout();
//   //   }
//   // }

//   decodeToken(token: string) {
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       console.log('Token payload:', payload);
//       this.currentUserSubject.next({
//         email: payload.sub,
//         role: payload.role
//       });
//     } catch (error) {
//       console.error('Error al decodificar token', error);
//       this.logout();
//     }
//   }

//   getUserRole(): string | null {
//     const currentUser = this.currentUserSubject.getValue();
//     return currentUser ? currentUser.role : null;
//   }

//   isLoggedIn(): boolean {
//     if (!this.isBrowser()) {
//       return false;
//     }
//     return !!localStorage.getItem('authToken');
//   }

  
// }


//cuarto try, el anterior es que iba pero no guardaba bien el usuario

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:9000/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeToken();
  }

  private initializeToken() {
    if (this.isBrowser()) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        this.currentUserSubject.next(parsedUserData);
      }
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (this.isBrowser()) {
          // Guardar toda la información del usuario, no solo el token
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userData', JSON.stringify({
            email: response.email,
            username: response.username,
            role: response.roles[0]
          }));
          this.currentUserSubject.next({
            email: response.email,
            username: response.username,
            role: response.roles[0]
          });
        }
      })
    );
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    }
    this.currentUserSubject.next(null);
  }

  getUserName(): string | null {
    const currentUser = this.currentUserSubject.getValue();
    return currentUser ? currentUser.username : null;
  }

  getUserRole(): string | null {
    const currentUser = this.currentUserSubject.getValue();
    return currentUser ? currentUser.role : null;
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser()) {
      return false;
    }
    return !!localStorage.getItem('authToken');
  }
}