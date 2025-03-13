import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

interface GeocodingResponse {
  lat: string;
  lon: string;
  display_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private nominatimUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) { }

  obtenerCoordenadas(calle: string, ciudad: string): Observable<{ lat: number, lng: number } | null> {
    // Construir la dirección completa
    const direccion = `${calle}, ${ciudad}, Spain`;
    
    // Construir los parámetros de la búsqueda
    const params = {
      q: direccion,
      format: 'json',
      limit: '1',
      addressdetails: '1'
    };

    return this.http.get<GeocodingResponse[]>(this.nominatimUrl, { params }).pipe(
      map(response => {
        if (response && response.length > 0) {
          return {
            lat: parseFloat(response[0].lat),
            lng: parseFloat(response[0].lon)
          };
        }
        return null;
      }),
      catchError(error => {
        console.error('Error al obtener coordenadas:', error);
        return of(null);
      })
    );
  }
}