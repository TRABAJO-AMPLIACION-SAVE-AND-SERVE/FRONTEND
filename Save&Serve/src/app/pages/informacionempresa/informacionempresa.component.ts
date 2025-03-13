// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { GeocodingService } from '../../services/geocoding.service';
// import { EmpresaService } from '../../services/empresaService/empresa.service';
// import { Empresa } from '../../models/empresa.model';
// import * as L from 'leaflet';

// @Component({
//   selector: 'app-informacionempresa',
//   standalone: true,
//   imports: [RouterModule, CommonModule],
//   templateUrl: './informacionempresa.component.html',
//   styleUrl: './informacionempresa.component.scss'
// })
// export class InformacionempresaComponent implements OnInit {
//   private map: L.Map | null = null;
//   private markers: L.Marker[] = [];
//   empresas: Empresa[] = [];

//   constructor(
//     private geocodingService: GeocodingService,
//     private empresaService: EmpresaService
//   ) { }

//   ngOnInit(): void {
//     this.initMap();
//     this.cargarEmpresas();
//   }

//   private initMap(): void {
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
//     document.head.appendChild(link);

//     setTimeout(() => {
//       this.map = L.map('mapa').setView([40.4168, -3.7038], 6);
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors'
//       }).addTo(this.map);
//     }, 100);
//   }

//   private cargarEmpresas(): void {
//     this.empresaService.getAll().subscribe({
//       next: (empresas) => {
//         this.empresas = empresas;
//         empresas.forEach(empresa => {
//           this.obtenerMostrarUbicacion(empresa);
//         });
//       },
//       error: (error) => console.error('Error al cargar empresas:', error)
//     });
//   }

//   obtenerMostrarUbicacion(empresa: Empresa): void {
//     this.geocodingService.obtenerCoordenadas(empresa.direccion, empresa.ciudad).subscribe({
//       next: (coordenadas) => {
//         if (coordenadas) {
//           this.mostrarUbicacion(coordenadas.lat, coordenadas.lng, empresa.nombre);
//         }
//       },
//       error: (error) => console.error('Error al obtener coordenadas:', error)
//     });
//   }

//   mostrarUbicacion(lat: number, lng: number, titulo: string): void {
//     if (!this.map) {
//       setTimeout(() => this.mostrarUbicacion(lat, lng, titulo), 100);
//       return;
//     }

//     // Crea marcador mapa
//     const marker = L.marker([lat, lng])
//       .addTo(this.map)
//       .bindPopup(`
//         <div class="popup-content">
//           <h6>${titulo}</h6>
//           <p>Haz click para más información</p>
//         </div>
//       `)
//       .openPopup();

//     // Guarda el marcador para que aparezcan todos los marcadores
//     this.markers.push(marker);

//     this.map.setView([lat, lng], 15);
//   }

//   TotalDonaciones(empresa: Empresa): number {
//     let total = 0;
//     if (Array.isArray(empresa.donaciones)) {
//       total = empresa.donaciones.reduce((sum, donacion) => {
//         const donacionTotal = Number(donacion.totalDonacion) || 0;
//         return sum + donacionTotal;
//       }, 0);
//     }
//     return total;
//   }
// }

// Cambio para redireccion del boton al mapa
///////////////////////////////////////////////////////////////

// import { CommonModule } from '@angular/common';
// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { GeocodingService } from '../../services/geocoding.service';
// import { EmpresaService, RespuestaPaginada } from '../../services/empresaService/empresa.service';
// import { Empresa } from '../../models/empresa.model';
// import * as L from 'leaflet';

// @Component({
//   selector: 'app-informacionempresa',
//   standalone: true,
//   imports: [RouterModule, CommonModule],
//   templateUrl: './informacionempresa.component.html',
//   styleUrls: ['./informacionempresa.component.scss']
// })
// export class InformacionempresaComponent implements OnInit {
//   private map: L.Map | null = null;
//   private markersMap: Map<string, L.Marker> = new Map();
//   empresas: Empresa[] = [];
//   paginaActual = 0;
//   totalPaginas = 0;
//   tamanoPagina = 9;
//   @ViewChild('mapSection') mapSection!: ElementRef;

//   constructor(
//     private geocodingService: GeocodingService,
//     private empresaService: EmpresaService
//   ) {
//     console.log('Componente inicializado');
//   }

//   ngOnInit(): void {
//     console.log('ngOnInit ejecutado');
//     this.initMap();
//     this.cargarEmpresas();
//     this.cargarEmpresasPaginadas();

//   }

//   private initMap(): void {
//     console.log('Inicializando mapa...');
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
//     document.head.appendChild(link);

//     setTimeout(() => {
//       this.map = L.map('mapa', { scrollWheelZoom: false }).setView([0, 0], 2);
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors'
//       }).addTo(this.map);

//       this.map.on('mouseover', () => {
//         this.map?.scrollWheelZoom.enable();
//       });
//       this.map.on('mouseout', () => {
//         this.map?.scrollWheelZoom.disable();
//       });

//       console.log('Mapa inicializado');
//     }, 100);
//   }

//   private cargarEmpresas(): void {
//     this.empresaService.getAll().subscribe({
//       next: (empresas) => {
//         this.empresas = empresas;
//         empresas.forEach(empresa => {
//           this.agregarMarcador(empresa, false);
//         });
//       },
//       error: (error) => {
//         console.error('Error al cargar bancos de alimentos:', error);
//       }
//     });
//   }

//   obtenerMostrarUbicacion(empresa: Empresa): void {
//     console.log('Ver en el mapa para:', empresa);
//     const key = empresa.id ? empresa.id.toString() : empresa.nombre;
//     if (this.markersMap.has(key)) {
//       const marker = this.markersMap.get(key)!;
//       const latlng = marker.getLatLng();
//       this.map?.setView(latlng, 15);
//       this.scrollToMap();
//     } else {
//       this.agregarMarcador(empresa, true);
//     }
//   }
//   private agregarMarcador(empresa: Empresa, centrar: boolean): void {
//     const key = empresa.id ? empresa.id.toString() : empresa.nombre;
//     this.geocodingService.obtenerCoordenadas(empresa.direccion, empresa.ciudad).subscribe({
//       next: (coordenadas) => {
//         if (coordenadas) {
//           if (this.markersMap.has(key)) {
//             if (centrar) {
//               const marker = this.markersMap.get(key)!;
//               this.map?.setView(marker.getLatLng(), 15);
//               this.scrollToMap();
//             }
//             return;
//           }
//           const marker = L.marker([coordenadas.lat, coordenadas.lng])
//             .addTo(this.map!)
//             .bindPopup(`
//               <div class="popup-content">
//                 <h6>${empresa.nombre}</h6>
//                 <p>Haz click para más información</p>
//               </div>
//             `)
//             .openPopup();
//           this.markersMap.set(key, marker);
//           console.log('Marcador agregado para:', empresa);
//           if (centrar) {
//             setTimeout(() => {
//               this.map?.setView([coordenadas.lat, coordenadas.lng], 15);
//               this.scrollToMap();
//             }, 300);
//           }
//         } else {
//           console.error('No se pudieron obtener las coordenadas para:', empresa.nombre);
//         }
//       },
//       error: (error) => {
//         console.error('Error al obtener coordenadas:', error);
//       }
//     });
//   }

//   scrollToMap(): void {
//     if (this.mapSection) {
//       setTimeout(() => {
//         this.mapSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
//       });
//     }
//   }

//   // TotalDonaciones(empresa: Empresa): number {
//   //   let total = 0;
//   //   // if (Array.isArray(empresa.donaciones)) {
//   //   //   total = empresa.donaciones.reduce((sum, donacion) => {
//   //   //     const donacionTotal = Number(donacion.totalDonacion) || 0;
//   //   //     return sum + donacionTotal;
//   //   //   }, 0);
//   //   // }
//   //   return total;
//   // }
//   private cargarEmpresasPaginadas(): void {
//     this.empresaService.obtenerEmpresasPaginadas(this.paginaActual, this.tamanoPagina).subscribe({
//       next: (respuesta: RespuestaPaginada<Empresa>) => {
//         this.empresas = respuesta.content;
//         this.totalPaginas = respuesta.totalPages;
//         // Limpiar marcadores existentes
//         this.markersMap.forEach(marker => marker.remove());
//         this.markersMap.clear();
//         // Agregar marcadores para las nuevas empresas
//         this.empresas.forEach(empresa => {
//           this.agregarMarcador(empresa, false);
//         });
//       },
//       error: (error) => {
//         console.error('Error al cargar empresas paginadas:', error);
//       }
//     });
//   }
// // Añade este método en tu clase InformacionempresaComponent
// arrayDePaginas(): number[] {
//   // Si hay muchas páginas, puedes limitar cuántas se muestran
//   const paginasAMostrar = 5;
//   const arrayPaginas: number[] = [];
  
//   let inicio = Math.max(1, this.paginaActual - Math.floor(paginasAMostrar / 2));
//   let fin = Math.min(this.totalPaginas, inicio + paginasAMostrar - 1);
  
//   // Ajustar el inicio si estamos cerca del final
//   inicio = Math.max(1, fin - paginasAMostrar + 1);
  
//   for (let i = inicio; i <= fin; i++) {
//       arrayPaginas.push(i);
//   }
  
//   return arrayPaginas;
// }
//   cambiarPagina(nuevaPagina: number): void {
//     this.paginaActual = nuevaPagina;
//     this.cargarEmpresasPaginadas();
//   }


//   //////
//   totalDonacionesPorEmpresa = new Map<number, number>();
//   TotalDonaciones(empresa: Empresa): number {
//     if (!empresa.id) return 0;
//     return this.totalDonacionesPorEmpresa.get(empresa.id) || 0;
//   }
// }

////////////////////////////////////////////


import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeocodingService } from '../../services/geocoding.service';
import { EmpresaService, RespuestaPaginada } from '../../services/empresaService/empresa.service';
import { Empresa } from '../../models/empresa.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-informacionempresa',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './informacionempresa.component.html',
  styleUrls: ['./informacionempresa.component.scss']
})
export class InformacionempresaComponent implements OnInit {
  private map: L.Map | null = null;
  private markersMap: Map<string, L.Marker> = new Map();
  empresas: Empresa[] = [];
  paginaActual = 0;
  totalPaginas = 0;
  tamanoPagina = 9;
  totalDonacionesPorEmpresa = new Map<number, number>();
  @ViewChild('mapSection') mapSection!: ElementRef;

  constructor(
    private geocodingService: GeocodingService,
    private empresaService: EmpresaService
  ) {
    console.log('Componente inicializado');
  }

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    this.initMap();
    this.cargarEmpresas();
    this.cargarEmpresasPaginadas();
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

  private cargarEmpresas(): void {
    this.empresaService.getAll().subscribe({
      next: (empresas) => {
        this.empresas = empresas;
        empresas.forEach(empresa => {
          this.agregarMarcador(empresa, false);
          if (empresa.id) {
            this.cargarTotalDonacionesEmpresa(empresa.id);
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar bancos de alimentos:', error);
      }
    });
  }

  obtenerMostrarUbicacion(empresa: Empresa): void {
    console.log('Ver en el mapa para:', empresa);
    const key = empresa.id ? empresa.id.toString() : empresa.nombre;
    if (this.markersMap.has(key)) {
      const marker = this.markersMap.get(key)!;
      const latlng = marker.getLatLng();
      this.map?.setView(latlng, 15);
      this.scrollToMap();
    } else {
      this.agregarMarcador(empresa, true);
    }
  }

  private agregarMarcador(empresa: Empresa, centrar: boolean): void {
    const key = empresa.id ? empresa.id.toString() : empresa.nombre;
    this.geocodingService.obtenerCoordenadas(empresa.direccion, empresa.ciudad).subscribe({
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
                <h6>${empresa.nombre}</h6>
                <p>Haz click para más información</p>
              </div>
            `)
            .openPopup();
          this.markersMap.set(key, marker);
          console.log('Marcador agregado para:', empresa);
          if (centrar) {
            setTimeout(() => {
              this.map?.setView([coordenadas.lat, coordenadas.lng], 15);
              this.scrollToMap();
            }, 300);
          }
        } else {
          console.error('No se pudieron obtener las coordenadas para:', empresa.nombre);
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

  private cargarEmpresasPaginadas(): void {
    this.empresaService.obtenerEmpresasPaginadas(this.paginaActual, this.tamanoPagina).subscribe({
      next: (respuesta: RespuestaPaginada<Empresa>) => {
        this.empresas = respuesta.content;
        this.totalPaginas = respuesta.totalPages;
        // Limpiar marcadores existentes
        this.markersMap.forEach(marker => marker.remove());
        this.markersMap.clear();
        // Agregar marcadores para las nuevas empresas
        this.empresas.forEach(empresa => {
          this.agregarMarcador(empresa, false);
          if (empresa.id) {
            this.cargarTotalDonacionesEmpresa(empresa.id);
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar empresas paginadas:', error);
      }
    });
  }

  arrayDePaginas(): number[] {
    const paginasAMostrar = 5;
    const arrayPaginas: number[] = [];
    
    let inicio = Math.max(1, this.paginaActual - Math.floor(paginasAMostrar / 2));
    let fin = Math.min(this.totalPaginas, inicio + paginasAMostrar - 1);
    
    inicio = Math.max(1, fin - paginasAMostrar + 1);
    
    for (let i = inicio; i <= fin; i++) {
      arrayPaginas.push(i);
    }
    
    return arrayPaginas;
  }

  cambiarPagina(nuevaPagina: number): void {
    this.paginaActual = nuevaPagina;
    this.cargarEmpresasPaginadas();
  }

  private cargarTotalDonacionesEmpresa(empresaId: number): void {
    this.empresaService.getTotalDonaciones(empresaId).subscribe({
      next: (total) => {
        this.totalDonacionesPorEmpresa.set(empresaId, total);
      },
      error: (error) => {
        console.error('Error al cargar total de donaciones:', error);
        this.totalDonacionesPorEmpresa.set(empresaId, 0);
      }
    });
  }

  TotalDonaciones(empresa: Empresa): number {
    if (!empresa.id) return 0;
    return this.totalDonacionesPorEmpresa.get(empresa.id) || 0;
  }
}