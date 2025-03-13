import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LineaProducto } from '../../models/lineaProdcuto.model';

@Injectable({
  providedIn: 'root'
})
export class LineaProductoService {
  private url = 'http://localhost:9000/lineas-producto'; //nube

  constructor(private http: HttpClient) { }

  getAll(): Observable<LineaProducto[]> {
    return this.http.get<LineaProducto[]>(this.url);
  }

  getById(id: number): Observable<LineaProducto> {
    return this.http.get<LineaProducto>(`${this.url}/${id}`);
  }

  create(lineaProducto: LineaProducto): Observable<LineaProducto> {
    return this.http.post<LineaProducto>(this.url, lineaProducto);
  }

  update(id: number, lineaProducto: LineaProducto): Observable<LineaProducto> {
    return this.http.put<LineaProducto>(`${this.url}/${id}`, lineaProducto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getByDonacion(donacionId: number): Observable<LineaProducto[]> {
    return this.http.get<LineaProducto[]>(`${this.url}/donacion/${donacionId}`);
  }
}