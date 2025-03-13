// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Alergenos } from '../../models/alergenos.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AlergenosService {
//   private url = 'http://localhost:9000/alergenos';

//   constructor(private http: HttpClient) { }

//   getAll(): Observable<Alergenos[]> {
//     return this.http.get<Alergenos[]>(this.url);
//   }

//   getById(id: number): Observable<Alergenos> {
//     return this.http.get<Alergenos>(`${this.url}/${id}`);
//   }

//   create(alergeno: Alergenos): Observable<Alergenos> {
//     return this.http.post<Alergenos>(this.url, alergeno);
//   }

//   update(id: number, alergeno: Alergenos): Observable<Alergenos> {
//     return this.http.put<Alergenos>(`${this.url}/${id}`, alergeno);
//   }

//   delete(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.url}/${id}`);
//   }
// }

//Cambios leti

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alergenos } from '../../models/alergenos.model';

@Injectable({
  providedIn: 'root'
})
export class AlergenosService {
  private baseUrl = 'http://localhost:9000/alergenos'; 
  constructor(private http: HttpClient) { }

  getAllAlergenos(): Observable<Alergenos[]> {
    return this.http.get<Alergenos[]>(this.baseUrl);
  }

  getAlergenoById(id: number): Observable<Alergenos> {
    return this.http.get<Alergenos>(`${this.baseUrl}/${id}`);
  }

  saveAlergeno(alergeno: Alergenos): Observable<Alergenos> {
    return this.http.post<Alergenos>(this.baseUrl, alergeno);
  }

  deleteAlergeno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Método adicional útil para obtener la URL de la imagen
  getImagenUrl(imagenNombre: string): string {
    return `${this.baseUrl}/imagenes/${imagenNombre}`;
  }
}