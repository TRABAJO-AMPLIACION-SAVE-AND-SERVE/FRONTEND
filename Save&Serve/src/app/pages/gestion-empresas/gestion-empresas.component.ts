

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
      documentacionValidada: [false],
      tipo: ['', Validators.required],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 
  ngOnInit(): void {
    this.cargarEmpresas();
    this.ciudades.sort((a, b) => a.localeCompare(b));

  }

  cargarEmpresas() {
    this.empresaService.getAll().subscribe(data => {
      const validados = JSON.parse(localStorage.getItem('empresasValidadas') || '{}');
      this.empresas = data.map((empresa: any) => ({
        ...empresa,
        documentacionValidada: validados[empresa.id] === true,
        tipo: empresa.tipo || ''
      }));
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

  toggleValidacion(empresa: Empresa) {
    empresa.documentacionValidada = !empresa.documentacionValidada;
    let validados = JSON.parse(localStorage.getItem('empresasValidadas') || '{}');
    if (empresa.id !== undefined) {
      empresa.documentacionValidada ? (validados[empresa.id] = true) : delete validados[empresa.id];
    }
    localStorage.setItem('empresasValidadas', JSON.stringify(validados));
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
