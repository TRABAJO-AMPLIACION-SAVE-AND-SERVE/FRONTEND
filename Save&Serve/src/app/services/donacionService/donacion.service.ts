// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Donacion } from '../../models/donacion.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class DonacionService {
//   private url = 'http://localhost:9000/donaciones'; //nube

//   constructor(private http: HttpClient) { }

//   getAll(): Observable<Donacion[]> {
//     return this.http.get<Donacion[]>(this.url);
//   }

//   getById(id: number): Observable<Donacion> {
//     return this.http.get<Donacion>(`${this.url}/${id}`);
//   }

//   create(donacion: Donacion): Observable<Donacion> {
//     return this.http.post<Donacion>(this.url, donacion);
//   }

//   update(id: number, donacion: Donacion): Observable<Donacion> {
//     return this.http.put<Donacion>(`${this.url}/${id}`, donacion);
//   }

//   delete(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.url}/${id}`);
//   }

//   getDonacionesByEmpresa(empresaId: number): Observable<Donacion[]> {
//     return this.http.get<Donacion[]>(`${this.url}/empresa/${empresaId}`);
//   }

//   getDonacionesByBanco(bancoId: number): Observable<Donacion[]> {
//     return this.http.get<Donacion[]>(`${this.url}/bancos/${bancoId}`);
//   }

//   //leti

//   getBancos(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.url}/bancos`);
//   }

//   createDonacion(donacion: any): Observable<any> {
//     return this.http.post(`${this.url}/donaciones`, donacion);
//   }
// }


///cambios

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of, throwError } from 'rxjs';
// import { tap, catchError, map } from 'rxjs/operators';
// import { Donacion } from '../../models/donacion.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class DonacionService {
//   private baseUrl = 'http://localhost:9000'; // URL base
//   private donacionesUrl = `${this.baseUrl}/donaciones`; // URL para donaciones
//   private bancosUrl = `${this.baseUrl}/bancos`; // URL específica para bancos

//   constructor(private http: HttpClient) { }

//   getAll(): Observable<Donacion[]> {
//     return this.http.get<Donacion[]>(this.donacionesUrl);
//   }

//   getById(id: number): Observable<Donacion> {
//     return this.http.get<Donacion>(`${this.donacionesUrl}/${id}`);
//   }

//   create(donacion: Donacion): Observable<Donacion> {
//     return this.http.post<Donacion>(this.donacionesUrl, donacion);
//   }

//   update(id: number, donacion: Donacion): Observable<Donacion> {
//     return this.http.put<Donacion>(`${this.donacionesUrl}/${id}`, donacion);
//   }

//   delete(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.donacionesUrl}/${id}`);
//   }

//   // getDonacionesByEmpresa(empresaId: number): Observable<Donacion[]> {
//   //   return this.http.get<Donacion[]>(`${this.donacionesUrl}/empresa/${empresaId}`);
//   // }

//   getDonacionesByBanco(bancoId: number): Observable<Donacion[]> {
//     return this.http.get<Donacion[]>(`${this.donacionesUrl}/bancos/${bancoId}`);
//   }

//   getBancos(): Observable<any[]> {
//     console.log('Solicitando bancos...');
//     return this.http.get<any[]>(this.bancosUrl).pipe(
//       tap(response => console.log('Respuesta de bancos:', response)),
//       catchError(error => {
//         console.error('Error al obtener bancos:', error);
//         return throwError(() => error);
//       })
//     );
//   }

//   createDonacion(donacion: any): Observable<any> {
//     return this.http.post(this.donacionesUrl, donacion).pipe(
//       tap(response => console.log('Donación creada:', response)),
//       catchError(error => {
//         console.error('Error al crear donación:', error);
//         return throwError(() => error);
//       })
//     );
//   }


//   getTransportes(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/transportes`).pipe(
//       tap(response => console.log('Respuesta transportes:', response)),
//       catchError(error => {
//         console.error('Error al obtener transportes:', error);
//         return throwError(() => error);
//       })
//     );
//   }

//   // getAlergenos(): Observable<any[]> {
//   //   return this.http.get<any[]>(`${this.baseUrl}/alergenos`).pipe(
//   //     tap(response => console.log('Respuesta alérgenos:', response)),
//   //     catchError(error => {
//   //       console.error('Error al obtener alérgenos:', error);
//   //       return throwError(() => error);
//   //     })
//   //   );
//   // }
//   // En donacion.service.ts

//   // getDonacionesByEmpresa(empresaId: number): Observable<any[]> {
//   //   return this.http.get<any[]>(`${this.baseUrl}/empresa/${empresaId}`);
//   // }
// // donacion.service.ts
// // donacion.service.ts
// getAlergenos(): Observable<any[]> {
//   console.log('Solicitando alérgenos...');
//   return this.http.get<any[]>(`${this.baseUrl}/alergenos`).pipe(
//     tap(response => {
//       console.log('Respuesta alérgenos:', response);
//     }),
//     catchError(error => {
//       console.error('Error al obtener alérgenos:', error);
//       return of([]); // Retorna array vacío en caso de error
//     })
//   );
// }

// getDonacionesByEmpresa(empresaId: number): Observable<any[]> {
//   return this.http.get<any[]>(`${this.baseUrl}/donaciones/empresa/${empresaId}`).pipe(
//     map(response => {
//       if (Array.isArray(response)) {
//         return response;
//       }
//       console.warn('Respuesta no es un array:', response);
//       return [];
//     }),
//     catchError(error => {
//       console.error('Error al obtener donaciones:', error);
//       return of([]);
//     })
//   );
// }
// }


///Drama

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of, throwError } from 'rxjs';
// import { tap, catchError, map } from 'rxjs/operators';
// import { Donacion } from '../../models/donacion.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class DonacionService {
//   private baseUrl = 'http://localhost:9000';
//   private donacionesUrl = `${this.baseUrl}/donaciones`;
//   private bancosUrl = `${this.baseUrl}/bancos`;

//   constructor(private http: HttpClient) { }

//   private handleError(error: HttpErrorResponse, operation = 'operation') {
//     console.error(`${operation} failed:`, error);
//     if (error.error instanceof ErrorEvent) {
//       console.error('Client side error:', error.error.message);
//     } else {
//       console.error(`Backend returned code ${error.status}, body was:`, error.error);
//     }
//     return of([]); // Retornamos array vacío por defecto
//   }

//   getAll(): Observable<Donacion[]> {
//     return this.http.get<Donacion[]>(this.donacionesUrl).pipe(
//       tap(donaciones => console.log('Donaciones obtenidas:', donaciones.length)),
//       catchError(error => this.handleError(error, 'getAll'))
//     );
//   }

//   getById(id: number): Observable<Donacion | null> {
//     return this.http.get<Donacion>(`${this.donacionesUrl}/${id}`).pipe(
//       tap(donacion => console.log('Donación obtenida:', donacion)),
//       catchError(error => {
//         this.handleError(error, `getById id=${id}`);
//         return of(null);
//       })
//     );
//   }

//   create(donacion: Donacion): Observable<Donacion | null> {
//     return this.http.post<Donacion>(this.donacionesUrl, donacion).pipe(
//       tap(newDonacion => console.log('Donación creada:', newDonacion)),
//       catchError(error => {
//         this.handleError(error, 'create');
//         return of(null);
//       })
//     );
//   }

//   update(id: number, donacion: Donacion): Observable<Donacion | null> {
//     return this.http.put<Donacion>(`${this.donacionesUrl}/${id}`, donacion).pipe(
//       tap(updatedDonacion => console.log('Donación actualizada:', updatedDonacion)),
//       catchError(error => {
//         this.handleError(error, `update id=${id}`);
//         return of(null);
//       })
//     );
//   }

//   delete(id: number): Observable<boolean> {
//     return this.http.delete<void>(`${this.donacionesUrl}/${id}`).pipe(
//       map(() => true),
//       catchError(error => {
//         this.handleError(error, `delete id=${id}`);
//         return of(false);
//       })
//     );
//   }

//   getBancos(): Observable<any[]> {
//     console.log('Solicitando bancos...');
//     return this.http.get<any[]>(this.bancosUrl).pipe(
//       tap(bancos => console.log('Bancos obtenidos:', bancos.length)),
//       catchError(error => this.handleError(error, 'getBancos'))
//     );
//   }

//   getTransportes(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/transportes`).pipe(
//       tap(transportes => console.log('Transportes obtenidos:', transportes.length)),
//       catchError(error => this.handleError(error, 'getTransportes'))
//     );
//   }

//   getAlergenos(): Observable<any[]> {
//     console.log('Solicitando alérgenos...');
//     return this.http.get<any[]>(`${this.baseUrl}/alergenos`).pipe(
//       tap(alergenos => {
//         console.log('Alérgenos obtenidos:', alergenos.length);
//       }),
//       catchError(error => this.handleError(error, 'getAlergenos'))
//     );
//   }

//   getDonacionesByEmpresa(empresaId: number): Observable<any[]> {
//     return this.http.get<any[]>(`${this.donacionesUrl}/empresa/${empresaId}`).pipe(
//       map(response => {
//         if (!response) {
//           console.warn('Respuesta vacía para empresa:', empresaId);
//           return [];
//         }
//         if (!Array.isArray(response)) {
//           console.warn('Respuesta no es un array:', response);
//           return [];
//         }
//         return response;
//       }),
//       tap(donaciones => console.log(`Donaciones obtenidas para empresa ${empresaId}:`, donaciones.length)),
//       catchError(error => this.handleError(error, `getDonacionesByEmpresa id=${empresaId}`))
//     );
//   }

//   getDonacionesByBanco(bancoId: number): Observable<any[]> {
//     return this.http.get<any[]>(`${this.donacionesUrl}/bancos/${bancoId}`).pipe(
//       tap(donaciones => console.log(`Donaciones obtenidas para banco ${bancoId}:`, donaciones.length)),
//       catchError(error => this.handleError(error, `getDonacionesByBanco id=${bancoId}`))
//     );
//   }

//   createDonacion(donacion: any): Observable<any> {
//     return this.http.post(this.donacionesUrl, donacion).pipe(
//       tap(response => console.log('Donación creada:', response)),
//       catchError(error => {
//         console.error('Error al crear donación:', error);
//         return throwError(() => new Error('Error al crear la donación'));
//       })
//     );
//   }
// }


//Drama total:

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Donacion } from '../../models/donacion.model';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private baseUrl = 'http://localhost:9000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse, operation = 'operation') {
    console.error(`Error en ${operation}:`, error);
    if (error.error instanceof ErrorEvent) {
      console.error('Error del cliente:', error.error.message);
    } else {
      console.error(`Error del servidor (${error.status}):`, error.error);
    }
    // Según el tipo de operación, decidimos si devolver array vacío o throwError
    if (operation.includes('get')) {
      return of([]);
    }
    return throwError(() => new Error(error.error?.message || 'Error en el servidor'));
  }

  getAll(): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(`${this.baseUrl}/donaciones`, this.httpOptions).pipe(
      tap(donaciones => console.log('Total donaciones:', donaciones.length)),
      catchError(error => this.handleError(error, 'getAll'))
    );
  }

  getById(id: number): Observable<Donacion | null> {
    return this.http.get<Donacion>(`${this.baseUrl}/donaciones/${id}`, this.httpOptions).pipe(
      tap(donacion => console.log('Donación recuperada:', donacion)),
      catchError(error => {
        this.handleError(error, `getById ${id}`);
        return of(null);
      })
    );
  }

  getBancos(): Observable<any[]> {
    console.log('Solicitando bancos...');
    return this.http.get<any[]>(`${this.baseUrl}/bancos`, this.httpOptions).pipe(
      tap(bancos => console.log('Bancos recuperados:', bancos.length)),
      catchError(error => this.handleError(error, 'getBancos'))
    );
  }

  getTransportes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transportes`, this.httpOptions).pipe(
      tap(transportes => console.log('Transportes recuperados:', transportes.length)),
      catchError(error => this.handleError(error, 'getTransportes'))
    );
  }

  getAlergenos(): Observable<any[]> {
    console.log('Solicitando alérgenos...');
    return this.http.get<any[]>(`${this.baseUrl}/alergenos`, this.httpOptions).pipe(
      tap(alergenos => {
        console.log('Alérgenos recibidos:', alergenos);
      }),
      catchError(error => {
        console.error('Error al obtener alérgenos:', error);
        return of([]); // Retorna array vacío en caso de error
      })
    );
  }

  getDonacionesByEmpresa(empresaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/donaciones/empresa/${empresaId}`, this.httpOptions).pipe(
      tap(donaciones => console.log(`Donaciones de empresa ${empresaId}:`, donaciones.length)),
      catchError(error => this.handleError(error, `getDonacionesByEmpresa ${empresaId}`))
    );
  }
  

  getDonacionesByBanco(bancoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/donaciones/bancos/${bancoId}`, this.httpOptions).pipe(
      tap(donaciones => console.log(`Donaciones de banco ${bancoId}:`, donaciones.length)),
      catchError(error => this.handleError(error, `getDonacionesByBanco ${bancoId}`))
    );
  }

  createDonacion(donacion: any): Observable<any> {
    console.log('Enviando donación:', donacion);
    return this.http.post(`${this.baseUrl}/donaciones`, donacion, this.httpOptions).pipe(
      tap(response => console.log('Donación creada exitosamente:', response)),
      catchError(error => {
        console.error('Error al crear donación:', error);
        return throwError(() => new Error('No se pudo crear la donación. Por favor, inténtelo de nuevo.'));
      })
    );
  }

  update(id: number, donacion: Donacion): Observable<Donacion | null> {
    return this.http.put<Donacion>(`${this.baseUrl}/donaciones/${id}`, donacion, this.httpOptions).pipe(
      tap(updated => console.log('Donación actualizada:', updated)),
      catchError(error => {
        this.handleError(error, `update ${id}`);
        return of(null);
      })
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<void>(`${this.baseUrl}/donaciones/${id}`, this.httpOptions).pipe(
      map(() => true),
      catchError(error => {
        this.handleError(error, `delete ${id}`);
        return of(false);
      })
    );
  }

  // getDonacionesByEmpresa(empresaId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/empresa/${empresaId}`);
  // }
// donacion.service.ts
// getDonacionesByEmpresa(empresaId: number): Observable<any[]> {
//   // Usar la URL completa de tu endpoint
//   return this.http.get<any[]>(`${this.baseUrl}/donaciones/empresa/${empresaId}`);
// }

updateEstadoDonacion(id: number, nuevoEstado: string): Observable<Donacion> {
  // Aquí enviamos la solicitud PUT con el nuevo estado
  return this.http.put<Donacion>(`${this.baseUrl}/${id}`, { estadoEnvio: nuevoEstado }).pipe(
    tap(response => console.log('Estado de donación actualizado:', response)),
    catchError(error => {
      console.error('Error al actualizar el estado de la donación:', error);
      return throwError(() => error);
    })
  );
}
// }

}