import { Component, OnInit } from '@angular/core';
import { TransporteService } from '../../services/transporteService/transporte.service';
import { Donacion, EstadoEnvio } from '../../models/donacion.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DonacionService } from '../../services/donacionService/donacion.service';
import { EmpresaService } from '../../services/empresaService/empresa.service';
import { AuthService } from '../../services/autentificacion/auth.service';

@Component({
  selector: 'app-gestion-transportes',
  imports: [ RouterModule, CommonModule],
  templateUrl: './gestion-transportes.component.html',
  styleUrls: ['./gestion-transportes.component.scss']
})
export class GestionTransportesComponent implements OnInit {
  donaciones: any[] = [];
  empresa: any = {};
  loadingDonaciones: boolean = false;
  errorDonaciones: string | null = null;

  constructor(
    private donacionService: DonacionService,
    private empresaService: EmpresaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCurrentEmpresa();
  }

  loadCurrentEmpresa() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData && userData.email) {
      this.empresaService.getEmpresaByEmail(userData.email).subscribe({
        next: (data) => {
          this.empresa = data;
          this.loadDonacionesEmpresa(data.id);
        },
        error: (error) => {
          console.error('Error al cargar empresa:', error);
        }
      });
    }
  }

  loadDonacionesEmpresa(empresaId: number) {
    this.loadingDonaciones = true;
    this.donacionService.getDonacionesByEmpresa(empresaId).subscribe({
      next: (data) => {
        this.donaciones = data;
        this.loadingDonaciones = false;
      },
      error: (error) => {
        console.error('Error al cargar donaciones:', error);
        this.errorDonaciones = 'Error al cargar las donaciones';
        this.loadingDonaciones = false;
      }
    });
  }

  updateEstadoDonacion(donacionId: number, nuevoEstado: string) {
    this.donacionService.updateEstadoDonacion(donacionId, nuevoEstado).subscribe({
      next: () => {
        // Actualizamos el estado localmente en la lista de donaciones
        const donacion = this.donaciones.find(d => d.id === donacionId);
        if (donacion) {
          donacion.estadoEnvio = nuevoEstado;
        }
      },
      error: (error) => {
        console.error('Error al actualizar el estado:', error);
      }
    });
  }
}