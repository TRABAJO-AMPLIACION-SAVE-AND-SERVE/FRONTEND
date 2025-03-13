import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transporte } from '../../models/transporte.model';
import { Donacion } from '../../models/donacion.model';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {
  private url = 'http://localhost:9000/transportes'; //nube

  constructor(private http: HttpClient) { }

  getAll(): Observable<Transporte[]> {
    return this.http.get<Transporte[]>(this.url);
  }

  getById(id: number): Observable<Transporte> {
    return this.http.get<Transporte>(`${this.url}/${id}`);
  }

  create(transporte: Transporte): Observable<Transporte> {
    return this.http.post<Transporte>(this.url, transporte);
  }

  update(id: number, transporte: Transporte): Observable<Transporte> {
    return this.http.put<Transporte>(`${this.url}/${id}`, transporte);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getByTipoTransporte(tipoId: number): Observable<Transporte[]> {
    return this.http.get<Transporte[]>(`${this.url}/tipo/${tipoId}`);
  }
  getDonacionesByTransporte(transporteId: number): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(`${this.url}transportes/${transporteId}/donaciones`);
  }
  cambiarEstadoDonacion(donacionId: number, nuevoEstado: string): Observable<any> {
    return this.http.patch(`${this.url}donaciones/${donacionId}`, { estado: nuevoEstado });
  }
}