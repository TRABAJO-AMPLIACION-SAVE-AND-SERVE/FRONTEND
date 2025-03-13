// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Producto } from '../../models/producto.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductoService {
//   private url = 'http://localhost:9000/productos'; //nube

//   constructor(private http: HttpClient) { }

//   getAll(): Observable<Producto[]> {
//     return this.http.get<Producto[]>(this.url);
//   }

//   getById(id: number): Observable<Producto> {
//     return this.http.get<Producto>(`${this.url}/${id}`);
//   }

//   create(producto: Producto): Observable<Producto> {
//     return this.http.post<Producto>(this.url, producto);
//   }

//   update(id: number, producto: Producto): Observable<Producto> {
//     return this.http.put<Producto>(`${this.url}/${id}`, producto);
//   }

//   delete(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.url}/${id}`);
//   }

//   getByTipo(tipo: string): Observable<Producto[]> {
//     return this.http.get<Producto[]>(`${this.url}/tipo/${tipo}`);
//   }
// }


//cambios leti

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = 'http://localhost:9000/productos';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  crear(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url, producto);
  }

  actualizar(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}/${id}`, producto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  obtenerPorIdProducto(idProducto: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/codigo/${idProducto}`);
  }
}