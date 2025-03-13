// //Segundo intento

// import { CommonModule } from '@angular/common';
// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { GeocodingService } from '../../services/geocoding.service';
// import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';
// import { BancoDeAlimentos } from '../../models/bancoAlimentos.model';
// import * as L from 'leaflet';

// @Component({
//   selector: 'app-haztevoluntario',
//   standalone: true,
//   imports: [RouterModule, CommonModule],
//   templateUrl: './haztevoluntario.component.html',
//   styleUrl: './haztevoluntario.component.scss'
// })
// export class HaztevoluntarioComponent implements OnInit {
//   private map: L.Map | null = null;
//   private markers: L.Marker[] = [];
//   bancos: BancoDeAlimentos[] = [];

//   @ViewChild('mapSection') mapSection!: ElementRef;

//   constructor(
//     private geocodingService: GeocodingService,
//     private bancoService: BancoalimentosService
//   ) {
//     console.log('Componente inicializado');
//   }

//   ngOnInit(): void {
//     console.log('ngOnInit ejecutado');
//     this.initMap();
//     this.cargarBancos();
//   }

//   private initMap(): void {
//     console.log('Inicializando mapa...');
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
//     document.head.appendChild(link);

//     setTimeout(() => {
//       // this.map = L.map('mapa').setView([40.4168, -3.7038], 6);
//       this.map = L.map('mapa', { scrollWheelZoom: false }).setView([0, 0], 2);
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors'
//       }).addTo(this.map);
//       console.log('Mapa inicializado');
//     }, 100);
//   }

//   private cargarBancos(): void {
//     console.log('Iniciando carga de bancos...');
//     this.bancoService.getAll().subscribe({
//       next: (bancos) => {
//         console.log('Bancos recibidos:', bancos);
//         this.bancos = bancos;
//         if (bancos.length === 0) {
//           console.log('No se recibieron bancos');
//         }
//         // Opcional: cargar ubicaciones automáticamente
//         bancos.forEach(banco => {
//           this.obtenerYMostrarUbicacion(banco);
//         });
//       },
//       error: (error) => {
//         console.error('Error al cargar bancos de alimentos:', error);
//       }
//     });
//   }

//   obtenerYMostrarUbicacion(banco: BancoDeAlimentos): void {
//     console.log('Obteniendo ubicación para:', banco);
//     this.geocodingService.obtenerCoordenadas(banco.direccion, banco.ciudad).subscribe({
//       next: (coordenadas) => {
//         if (coordenadas) {
//           console.log('Coordenadas obtenidas:', coordenadas);
//           this.mostrarUbicacion(coordenadas.lat, coordenadas.lng, banco.nombre);
//           this.scrollToMap();
//         } else {
//           console.error('No se pudieron obtener las coordenadas para:', banco.nombre);
//         }
//       },
//       error: (error) => {
//         console.error('Error al obtener coordenadas:', error);
//       }
//     });
//   }

//   mostrarUbicacion(lat: number, lng: number, titulo: string): void {
//     if (!this.map) {
//       setTimeout(() => this.mostrarUbicacion(lat, lng, titulo), 100);
//       return;
//     }

//     // Crear nuevo marcador
//     const marker = L.marker([lat, lng])
//       .addTo(this.map)
//       .bindPopup(`
//         <div class="popup-content">
//           <h6>${titulo}</h6>
//           <p>Haz click para más información</p>
//         </div>
//       `)
//       .openPopup();

//     // Guardar el marcador
//     this.markers.push(marker);

//     // Centrar el mapa
//     // this.map.setView([lat, lng], 15);
//     setTimeout(() => {
//       this.map?.setView([lat, lng], 15);
//       this.scrollToMap(); 

//     }, 300);

//   }
//  scrollToMap(): void {
//   if (this.mapSection) {
//     setTimeout(() => {
//       this.mapSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
//     });
//   }
// }

// }

// Cambion para que dirja los botones al mapa

import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeocodingService } from '../../services/geocoding.service';
import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';
import { BancoDeAlimentos } from '../../models/bancoAlimentos.model';
import * as L from 'leaflet';
import { RespuestaPaginada } from '../../services/empresaService/empresa.service';

@Component({
  selector: 'app-haztevoluntario',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './haztevoluntario.component.html',
  styleUrls: ['./haztevoluntario.component.scss']
})
export class HaztevoluntarioComponent implements OnInit {
  private map: L.Map | null = null;
  private markersMap: Map<string, L.Marker> = new Map();
  bancos: BancoDeAlimentos[] = [];
  paginaActual = 0;
  totalPaginas = 0;
  tamanoPagina = 9;

  @ViewChild('mapSection') mapSection!: ElementRef;

  constructor(
    private geocodingService: GeocodingService,
    private bancoService: BancoalimentosService
  ) {
    console.log('Componente inicializado');
  }

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    this.initMap();
    this.cargarBancos();
    this.cargarBancosPaginadas();

  }

  private initMap(): void {
    console.log('Inicializando mapa...');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    setTimeout(() => {
      this.map = L.map('mapa', { scrollWheelZoom: false }).setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.map.on('mouseover', () => {
        this.map?.scrollWheelZoom.enable();
      });
      this.map.on('mouseout', () => {
        this.map?.scrollWheelZoom.disable();
      });

      console.log('Mapa inicializado');
    }, 100);
  }

  private cargarBancos(): void {
    console.log('Iniciando carga de bancos...');
    this.bancoService.getAll().subscribe({
      next: (bancos) => {
        console.log('Bancos recibidos:', bancos);
        this.bancos = bancos;
        bancos.forEach(banco => {
          this.agregarMarcador(banco, false);
        });
      },
      error: (error) => {
        console.error('Error al cargar bancos de alimentos:', error);
      }
    });
  }

  obtenerYMostrarUbicacion(banco: BancoDeAlimentos): void {
    console.log('Ver en el mapa para:', banco);
    const key = banco.id ? banco.id.toString() : banco.nombre;
    if (this.markersMap.has(key)) {
      const marker = this.markersMap.get(key)!;
      const latlng = marker.getLatLng();
      this.map?.setView(latlng, 15);
      this.scrollToMap();
    } else {
      this.agregarMarcador(banco, true);
    }
  }
  private agregarMarcador(banco: BancoDeAlimentos, centrar: boolean): void {
    const key = banco.id ? banco.id.toString() : banco.nombre;
    this.geocodingService.obtenerCoordenadas(banco.direccion, banco.ciudad).subscribe({
      next: (coordenadas) => {
        if (coordenadas) {
          if (this.markersMap.has(key)) {
            if (centrar) {
              const marker = this.markersMap.get(key)!;
              this.map?.setView(marker.getLatLng(), 15);
              this.scrollToMap();
            }
            return;
          }
          const marker = L.marker([coordenadas.lat, coordenadas.lng])
            .addTo(this.map!)
            .bindPopup(`
              <div class="popup-content">
                <h6>${banco.nombre}</h6>
                <p>Haz click para más información</p>
              </div>
            `)
            .openPopup();
          this.markersMap.set(key, marker);
          console.log('Marcador agregado para:', banco);
          if (centrar) {
            setTimeout(() => {
              this.map?.setView([coordenadas.lat, coordenadas.lng], 15);
              this.scrollToMap();
            }, 300);
          }
        } else {
          console.error('No se pudieron obtener las coordenadas para:', banco.nombre);
        }
      },
      error: (error) => {
        console.error('Error al obtener coordenadas:', error);
      }
    });
  }

  scrollToMap(): void {
    if (this.mapSection) {
      setTimeout(() => {
        this.mapSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }
  private cargarBancosPaginadas(): void {
      this.bancoService.obtenerBancosPaginadas(this.paginaActual, this.tamanoPagina).subscribe({
        next: (respuesta: RespuestaPaginada<BancoDeAlimentos>) => {
          this.bancos = respuesta.content;
          this.totalPaginas = respuesta.totalPages;
          // Limpiar marcadores existentes
          this.markersMap.forEach(marker => marker.remove());
          this.markersMap.clear();
          // Agregar marcadores para las nuevas empresas
          this.bancos.forEach(bancos => {
            this.agregarMarcador(bancos, false);
          });
        },
        error: (error) => {
          console.error('Error al cargar empresas paginadas:', error);
        }
      });
    }
    arrayDePaginas(): number[] {
      // Si hay muchas páginas, puedes limitar cuántas se muestran
      const paginasAMostrar = 5;
      const arrayPaginas: number[] = [];
      
      let inicio = Math.max(1, this.paginaActual - Math.floor(paginasAMostrar / 2));
      let fin = Math.min(this.totalPaginas, inicio + paginasAMostrar - 1);
      
      // Ajustar el inicio si estamos cerca del final
      inicio = Math.max(1, fin - paginasAMostrar + 1);
      
      for (let i = inicio; i <= fin; i++) {
          arrayPaginas.push(i);
      }
      
      return arrayPaginas;
    }
      cambiarPagina(nuevaPagina: number): void {
        this.paginaActual = nuevaPagina;
        this.cargarBancosPaginadas();
      }
    
}
