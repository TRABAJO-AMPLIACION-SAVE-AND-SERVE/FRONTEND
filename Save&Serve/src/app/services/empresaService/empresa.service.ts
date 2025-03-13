import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../../models/empresa.model';

export interface RespuestaPaginada<T> {
  content: T[];             // Contenido de la página actual
  totalElements: number;    // Total de elementos
  totalPages: number;       // Total de páginas
  size: number;            // Tamaño de la página
  number: number;          // Número de página actual
  first: boolean;          // Si es la primera página
  last: boolean;           // Si es la última página
}

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
 
  private url = 'http://localhost:9000/empresas'; //nube

  constructor(private http: HttpClient) { }

  getAll(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.url);
  }

  getById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.url}/${id}`);
  }

  create(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(`${this.url}/registro`, empresa);
  }

  update(id: number, empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.url}/${id}`, empresa);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getEmpresasByTipo(tipo: string): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.url}/tipo/${tipo}`);
  }

  //Leti

  getEmpresa(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  updateEmpresa(id: number, empresa: any) {
    return this.http.put(`${this.url}/${id}`, empresa);
  }

  getEmpresaByEmail(email: string): Observable<any> {
    return this.http.get(`${this.url}/email/${email}`);
  }
  obtenerEmpresasPaginadas(pagina: number = 0, tamanoPagina: number = 9): Observable<RespuestaPaginada<Empresa>> {
    const params = new HttpParams()
      .set('page', pagina.toString())
      .set('size', tamanoPagina.toString());
    
    return this.http.get<RespuestaPaginada<Empresa>>(`${this.url}/paginadas`, { params });

    
  }
  getTotalDonaciones(empresaId: number): Observable<number> {
    return this.http.get<number>(`${this.url}/${empresaId}/total-donaciones`);
  }
}
