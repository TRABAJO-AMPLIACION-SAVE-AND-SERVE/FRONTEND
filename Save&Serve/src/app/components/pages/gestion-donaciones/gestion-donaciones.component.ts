import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DonacionService } from '../../../services/donacionService/donacion.service';


@Component({
  selector: 'app-gestion-donaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gestion-donaciones.component.html',
  styleUrl: './gestion-donaciones.component.scss'
})
export class GestionDonacionesComponent implements OnInit {
  donaciones: any[] = [];
  donacionesFiltradas: any[] = [];
  selectedDonacion: any = null;
  
  loadingDonaciones: boolean = false;
  errorDonaciones: string | null = null;
  mensaje: string = '';
  
  filtroEstado: string = '';

  constructor(private donacionService: DonacionService) {}

  ngOnInit() {
    this.cargarDonaciones();
  }

  cargarDonaciones() {
    this.loadingDonaciones = true;
    this.errorDonaciones = null;

    this.donacionService.getAll().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.donaciones = data;
          this.aplicarFiltro();
          console.log('Donaciones cargadas:', this.donaciones.length);
        } else {
          this.donaciones = [];
          this.donacionesFiltradas = [];
          console.warn('Datos de donaciones no válidos:', data);
        }
        this.loadingDonaciones = false;
      },
      error: (error) => {
        console.error('Error al cargar donaciones:', error);
        this.errorDonaciones = 'No se pudieron cargar las donaciones';
        this.donaciones = [];
        this.donacionesFiltradas = [];
        this.loadingDonaciones = false;
      }
    });
  }

  aplicarFiltro() {
    if (this.filtroEstado === '') {
      this.donacionesFiltradas = [...this.donaciones];
    } else {
      this.donacionesFiltradas = this.donaciones.filter(
        donacion => donacion.estadoEnvio === this.filtroEstado
      );
    }
    console.log(`Filtro aplicado: ${this.filtroEstado}. Mostrando ${this.donacionesFiltradas.length} donaciones.`);
  }

  recargarDonaciones() {
    this.cargarDonaciones();
    this.mostrarMensaje('Donaciones actualizadas');
  }

  verDetalle(donacion: any) {
    console.log('Ver detalle de donación:', donacion);
    this.selectedDonacion = donacion;
    
    // Mostrar modal
    const modal = document.getElementById('detalleModal');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
    }
  }

  cerrarDetalle() {
    this.selectedDonacion = null;
    const modal = document.getElementById('detalleModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
    }
  }

  aprobarDonacion(donacion: any) {
    console.log('Aprobando donación:', donacion.idDonacion);
    this.cambiarEstadoDonacion(donacion, 'ENVIADO', 'aprobada y enviada');
  }

  denegarDonacion(donacion: any) {
    console.log('Denegando donación:', donacion.idDonacion);
    this.cambiarEstadoDonacion(donacion, 'DENEGADO', 'denegada');
  }

  marcarComoEntregado(donacion: any) {
    console.log('Marcando como entregado:', donacion.idDonacion);
    this.cambiarEstadoDonacion(donacion, 'ENTREGADO', 'marcada como entregada');
  }

  private cambiarEstadoDonacion(donacion: any, nuevoEstado: string, accionTexto: string) {
    this.donacionService.updateEstadoDonacion(donacion.idDonacion, nuevoEstado).subscribe({
      next: (donacionActualizada) => {
        console.log('Estado actualizado:', donacionActualizada);
        
        // Actualizar en el array local
        const index = this.donaciones.findIndex(d => d.idDonacion === donacion.idDonacion);
        if (index !== -1) {
          this.donaciones[index] = { ...this.donaciones[index], estadoEnvio: nuevoEstado };
        }
        
        // Actualizar donación seleccionada si está abierta
        if (this.selectedDonacion && this.selectedDonacion.idDonacion === donacion.idDonacion) {
          this.selectedDonacion.estadoEnvio = nuevoEstado;
        }
        
        // Reaplicar filtro
        this.aplicarFiltro();
        
        this.mostrarMensaje(`Donación #${donacion.idDonacion} ${accionTexto} correctamente`);
        
        // Cerrar modal si está abierto
        this.cerrarDetalle();
      },
      error: (error) => {
        console.error('Error al actualizar estado:', error);
        this.mostrarMensaje(`Error al cambiar el estado de la donación`, true);
      }
    });
  }

  private mostrarMensaje(texto: string, esError: boolean = false) {
    if (esError) {
      this.errorDonaciones = texto;
      setTimeout(() => this.errorDonaciones = null, 5000);
    } else {
      this.mensaje = texto;
      setTimeout(() => this.mensaje = '', 4000);
    }
  }
}