import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoTransporte } from '../../models/tipoTransporte.model';

@Injectable({
  providedIn: 'root'
})
export class TipoTransporteService {
  private url = 'http://localhost:9000/tipo-transporte'; //nube

  constructor(private http: HttpClient) { }

  getAll(): Observable<TipoTransporte[]> {
    return this.http.get<TipoTransporte[]>(this.url);
  }

  getById(id: number): Observable<TipoTransporte> {
    return this.http.get<TipoTransporte>(`${this.url}/${id}`);
  }

  create(tipoTransporte: TipoTransporte): Observable<TipoTransporte> {
    return this.http.post<TipoTransporte>(this.url, tipoTransporte);
  }

  update(id: number, tipoTransporte: TipoTransporte): Observable<TipoTransporte> {
    return this.http.put<TipoTransporte>(`${this.url}/${id}`, tipoTransporte);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}