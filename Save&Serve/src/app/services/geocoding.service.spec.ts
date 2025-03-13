// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { GeocodingService } from './services/geocoding.service';

// describe('GeocodingService', () => {
//   let service: GeocodingService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [GeocodingService]
//     });
//     service = TestBed.inject(GeocodingService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

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

  obtenerCoordenadas(direccion: string, ciudad: string): Observable<{ lat: number, lng: number } | null> {
    const direccionCompleta = `${direccion}, ${ciudad}, Spain`;
    
    const params = {
      q: direccionCompleta,
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