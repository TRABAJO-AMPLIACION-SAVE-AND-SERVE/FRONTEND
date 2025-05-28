import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DonacionService } from '../../services/donacionService/donacion.service';
import { EstadoEnvio } from '../../models/donacion.model';

@Component({
  selector: 'app-zona-admin',
  imports: [RouterModule, CommonModule],
  templateUrl: './zona-admin.component.html',
  styleUrl: './zona-admin.component.scss'
})
export class ZonaAdminComponent implements OnInit {
  totalDonaciones: number = 0;
  donacionesMes: number = 0;
  kgSalvados: number = 0;
  valorEstimado: number = 0;
  empresasActivas: number = 0;
  empresasNuevas: number = 0;
  bancosRegistrados: number = 0;
  bancosEspera: number = 0;
  ultimasActividades: any[] = [];

  constructor(private donacionService: DonacionService) {}

  ngOnInit() {
    this.cargarEstadisticas();
    this.cargarUltimasActividades();
  }

  cargarEstadisticas() {
    this.donacionService.getAll().subscribe(donaciones => {
      // Filter out PENDIENTE and DENEGADO donations
      const activeDonaciones = donaciones.filter(
        d => d.estadoEnvio !== EstadoEnvio.PENDIENTE && d.estadoEnvio !== EstadoEnvio.DENEGADO
      );
      
      this.totalDonaciones = activeDonaciones.length;
      
      // Calculate this month's donations
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      this.donacionesMes = activeDonaciones.filter(
        d => new Date(d.fechaEntrega) >= firstDayOfMonth
      ).length;
      
      // Other calculations can be implemented similarly
    });
  }

  cargarUltimasActividades() {
    // Sample data - replace with actual implementation
    this.ultimasActividades = [
      {
        fecha: '2023-05-20',
        tipo: 'Donación',
        usuario: 'Empresa XYZ',
        accion: 'Creó donación',
        estado: 'Pendiente',
        estadoClass: 'warning'
      },
      {
        fecha: '2023-05-19',
        tipo: 'Validación',
        usuario: 'Admin',
        accion: 'Validó empresa',
        estado: 'Completo',
        estadoClass: 'success'
      }
    ];
  }
}