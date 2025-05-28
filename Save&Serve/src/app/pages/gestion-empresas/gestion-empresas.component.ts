

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmpresaService } from '../../services/empresaService/empresa.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empresa, Suscripcion } from '../../models/empresa.model';

@Component({
  selector: 'app-gestion-empresas',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './gestion-empresas.component.html',
  styleUrl: './gestion-empresas.component.scss'
})
export class GestionEmpresasComponent implements OnInit {
  tiposSuscripcion = Object.values(Suscripcion);
  tiposDeEmpresa: string[] = ['Hotel', 'Restaurante', 'Supermercado', 'Catering', 'Tienda', 'Bar', 'Cafetería', 'Otro'];
  ciudades: string[] = [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 
    'Málaga', 'Murcia', 'Palma de Mallorca', 'Las Palmas de Gran Canaria', 'Bilbao', 
    'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón', "L'Hospitalet de Llobregat", 
    'A Coruña', 'Vitoria-Gasteiz', 'Elche', 'Granada', 'Oviedo', 
    'Badalona', 'Cartagena', 'Terrassa', 'Jerez de la Frontera', 'Sabadell', 
    'Móstoles', 'Alcalá de Henares', 'Getafe', 'Almería', 'Santander', 
    'Castellón de la Plana', 'Burgos', 'Albacete', 'San Sebastián', 'Logroño', 
    'Cáceres', 'Salamanca', 'Huelva', 'Badajoz', 'Tarragona', 
    'León', 'Lleida', 'Cádiz', 'Jaén', 'Tenerife', 
    'Marbella', 'Fuenlabrada', 'Santa Cruz de Tenerife', 'Mataró', 'Tarragona', 
    'San Cristóbal de La Laguna', 'Reus', 'Pamplona', 'Toledo', 'Girona', 
    'Algeciras', 'Córdoba', 'San Sebastián de los Reyes', 'Sant Cugat del Vallès', 'Torrejón de Ardoz',
    'Pontevedra', 'Segovia', 'Soria', 'Cuenca', 'Teruel', 
    'Córdoba', 'Huesca', 'Ciudad Real', 'Zamora', 'Vigo'
  ];
  empresas: Empresa[] = [];
  empresaForm: FormGroup;
  modoEdicion = false;
  mensaje: string = '';
  empresaIdEdicion?: number;
 constructor(private empresaService: EmpresaService, private fb: FormBuilder) {
    this.empresaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cif: ['', [Validators.required, Validators.pattern(/^[A-Z][0-9]{8}$/)]], 
      ciudad: ['', Validators.required],
      suscripcion: [Suscripcion.BASICA, Validators.required],
      documentacionValidada: [''],
      tipo: ['', Validators.required],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 
  ngOnInit(): void {
    this.cargarEmpresas();
    this.ciudades.sort((a, b) => a.localeCompare(b));

  }

  // New: asi usamos los datos del backend directamente
  cargarEmpresas() {
    this.empresaService.getAll().subscribe({
      next: (data) => {
        this.empresas = data; 
        console.log('Empresas cargadas:', this.empresas);
      },
      error: (error) => {
        console.error('Error al cargar empresas:', error);
      }
    });
  }

  agregarEmpresa() {
    if (this.empresaForm.invalid) return;

    const empresaParaEnviar = { ...this.empresaForm.value };

    if (this.modoEdicion && this.empresaIdEdicion) {
      this.empresaService.update(this.empresaIdEdicion, empresaParaEnviar).subscribe(() => {
        this.cargarEmpresas();
        this.limpiarFormulario();
        this.mensaje = 'Modificación realizada con éxito';
        setTimeout(() => (this.mensaje = ''), 3000);
      });
    } else {
      this.empresaService.create(empresaParaEnviar).subscribe(() => {
        this.cargarEmpresas();
        this.limpiarFormulario();
      });
    }
  }

  editarEmpresa(empresa: Empresa) {
    this.empresaIdEdicion = empresa.id;
    this.empresaForm.patchValue(empresa);
    this.modoEdicion = true;
  }

  eliminarEmpresa(id: number) {
    this.empresaService.delete(id).subscribe(() => this.cargarEmpresas());
  }


  //NEW PARA LA EXPANSION
 // Agregar este método
 toggleValidacion(empresa: Empresa) {
  console.log('Estado actual:', empresa.documentacionValidada);
  const nuevoEstado = !empresa.documentacionValidada;
  console.log('Cambiando a:', nuevoEstado);
  
  this.empresaService.toggleValidation(empresa.id!, nuevoEstado).subscribe({
    next: (empresaActualizada) => {
      console.log('Respuesta del backend:', empresaActualizada);
      
      // Actualizar la empresa en el array local
      const index = this.empresas.findIndex(e => e.id === empresa.id);
      if (index !== -1) {
        this.empresas[index] = empresaActualizada;
      }
      
      const mensaje = nuevoEstado ? 'validada' : 'desvalidada';
      this.mensaje = `Empresa ${empresaActualizada.nombre} ${mensaje} correctamente`;
      setTimeout(() => (this.mensaje = ''), 3000);
    },
    error: (error) => {
      console.error('Error al cambiar validación:', error);
      console.error('Detalles del error:', error.error);
      this.mensaje = 'Error al cambiar el estado de validación';
      setTimeout(() => (this.mensaje = ''), 3000);
    }
  });
}

esValidada(empresa: any): boolean {
  return empresa.documentacionValidada === true;
}


  limpiarFormulario() {
    this.empresaForm.reset({
      nombre: '',
      telefono: '',
      direccion: '',
      email: '',
      cif: '',
      ciudad: '',
      suscripcion: Suscripcion.BASICA,
      documentacionValidada: false,
      tipo: '',
      contrasenia: ''
    });
    this.empresaIdEdicion = undefined;
    this.modoEdicion = false;
  }



}
