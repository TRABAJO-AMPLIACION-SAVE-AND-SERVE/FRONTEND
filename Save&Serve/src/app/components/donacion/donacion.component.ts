

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonacionService } from '../../services/donacionService/donacion.service';
import { AuthService } from '../../services/autentificacion/auth.service';
import { EmpresaService } from '../../services/empresaService/empresa.service';

@Component({
  selector: 'app-donacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donacion.component.html',
  styleUrl: './donacion.component.scss'
})
export class DonacionComponent implements OnInit {
  donaciones: any[] = [];
  empresa: any = {};
  loadingDonaciones: boolean = false;
  errorDonaciones: string | null = null;

  constructor(
    private donacionService: DonacionService,
    private empresaService: EmpresaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadCurrentEmpresa();
  }

  loadDonacionesEmpresa(empresaId: number) {
    this.loadingDonaciones = true;
    this.errorDonaciones = null;

    this.donacionService.getDonacionesByEmpresa(empresaId).subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.donaciones = data;
        } else {
          this.donaciones = [];
          console.warn('Datos de donaciones no válidos:', data);
        }
        this.loadingDonaciones = false;
      },
      error: (error) => {
        console.error('Error al cargar donaciones:', error);
        this.errorDonaciones = 'No se pudieron cargar las donaciones';
        this.donaciones = [];
        this.loadingDonaciones = false;
      }
    });
  }

  loadCurrentEmpresa() {
    const userDataStr = localStorage.getItem('userData');
    if (!userDataStr) {
      console.warn('No hay datos de usuario en localStorage');
      return;
    }

    try {
      const userData = JSON.parse(userDataStr);
      if (!userData?.email) {
        console.warn('Email de usuario no encontrado');
        return;
      }

      this.empresaService.getEmpresaByEmail(userData.email).subscribe({
        next: (data) => {
          if (data && data.id) {
            this.empresa = data;
            this.loadDonacionesEmpresa(data.id);
          } else {
            console.warn('Datos de empresa no válidos:', data);
          }
        },
        error: (error) => {
          console.error('Error al cargar empresa:', error);
          this.errorDonaciones = 'Error al cargar información de la empresa';
        }
      });
    } catch (error) {
      console.error('Error al procesar datos de usuario:', error);
    }
  }

  selectedDonacion: any = null;

  verDetalleDonacion(donacion: any) {
    console.log('Donación seleccionada:', donacion); // <-- Verificar datos
    this.selectedDonacion = donacion;

    const detalleModal = document.getElementById('detalleModal');
    if (detalleModal) {
      detalleModal.style.display = 'block';
    }
  }


  cerrarDetalleDonacion() {
    this.selectedDonacion = null;
    const detalleModal = document.getElementById('detalleModal');
    if (detalleModal) {
      detalleModal.style.display = 'none';
    }
  }



}