import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articulo } from '../../models/articulo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private url = 'http://localhost:9000/articulos'; //nube
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Articulo[]>(this.url);
  }
  getById(id: number) : Observable<Articulo> {
    return this.http.get<Articulo>(`${this.url}/${id}`);
  }
  // obtenerArticuloPorId(id: number): Observable<Articulos> {
  //   return this.http.get<Articulos>(`${this.url}/${id}`);
  // }
  
  getAllByTitulo(titulo: string) {
    return this.http.get<Articulo[]>(`${this.url}/titulo/${titulo}`);
  }
  obtenerArticulos(id?: string): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.url);
  }
  obtenerArticulosAll(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.url}/articles`);
}

obtenerArticuloPorId(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.url}/${id}`);
}
  create(articulo: Articulo) {
    return this.http.post<Articulo>(this.url, articulo, { headers: this.headers });
  }
  update(id: number, articulo: Articulo) : Observable<Articulo> {
    return this.http.put<Articulo>(`${this.url}/${id}`, articulo);
  }
  delete(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
