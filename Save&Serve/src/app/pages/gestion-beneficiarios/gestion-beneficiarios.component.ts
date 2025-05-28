import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BancoDeAlimentos } from '../../models/bancoAlimentos.model';

@Component({
  selector: 'app-gestion-beneficiarios',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './gestion-beneficiarios.component.html',
  styleUrl: './gestion-beneficiarios.component.scss'
})
export class GestionBeneficiariosComponent implements OnInit {

  modoEdicion = false;
  mensaje: string = '';
  beneficiarios: BancoDeAlimentos[] = [];
  beneficiarioForm: FormGroup | undefined;
  beneficiarioIdEdicion?: number;
  nuevoBeneficiario = {
    id: null,
    nombre: '',
    telefono: '',
    direccion: '',
    email: '',
    documentacionValidada: '',
    ciudad: '',
    contrasenia: ''
  };
  constructor(private bancoAlimentoService: BancoalimentosService, private fb: FormBuilder) {
    this.beneficiarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ciudad: ['', Validators.required],

      documentacionValidada: [false],

      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
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


  ngOnInit(): void {
    this.cargarBeneficiarios();
    this.ciudades.sort((a, b) => a.localeCompare(b));

  }
  cargarBeneficiarios() {
    this.bancoAlimentoService.getAll().subscribe({
      next: (data) => {
        this.beneficiarios = data; // New: Asignar directamente los datos obtenidos de la API
        console.log('Beneficiarios cargados:', this.beneficiarios);
      },
      error: (error) => {
        console.error('Error al cargar beneficiarios:', error);
      }
    });
  }
  agregarBeneficiario() {
    if (!this.beneficiarioForm || this.beneficiarioForm.invalid) return;

    const beneficiarioParaEnviar = { ...this.beneficiarioForm.value };

    if (this.modoEdicion && this.beneficiarioIdEdicion) {
      this.bancoAlimentoService.update(this.beneficiarioIdEdicion, beneficiarioParaEnviar).subscribe(() => {
        this.cargarBeneficiarios();
        this.limpiarFormulario();
        this.modoEdicion = false;
        this.mensaje = 'Modificación realizada con éxito';
        setTimeout(() => (this.mensaje = ''), 3000);
      });
    } else {
      this.bancoAlimentoService.create(beneficiarioParaEnviar).subscribe(() => {
        this.cargarBeneficiarios();
        this.limpiarFormulario();
      });
    }
  }


  limpiarFormulario() {
    if (!this.beneficiarioForm) return;
    this.beneficiarioForm.reset({
      nombre: '',
      telefono: '',
      direccion: '',
      email: '',
      ciudad: '',
      documentacionValidada: false,
      contrasenia: ''
    });
    this.beneficiarioIdEdicion = undefined;
    this.modoEdicion = false;
  }


  esValidada(beneficiario: any): boolean {
    return beneficiario.documentacionValidada === true;
  }


  //New expansion
  toggleValidacion(beneficiario: BancoDeAlimentos) {
    console.log('Estado actual:', beneficiario.documentacionValidada);
    const nuevoEstado = !beneficiario.documentacionValidada;
    console.log('Cambiando a:', nuevoEstado);
    
    this.bancoAlimentoService.toggleValidation(beneficiario.id!, nuevoEstado).subscribe({
      next: (beneficiarioActualizado) => {
        console.log('Respuesta del backend:', beneficiarioActualizado);
        
        // Actualizar en el array local
        const index = this.beneficiarios.findIndex(b => b.id === beneficiario.id);
        if (index !== -1) {
          this.beneficiarios[index] = beneficiarioActualizado;
        }
        
        const mensaje = nuevoEstado ? 'validado' : 'desvalidado';
        this.mensaje = `Beneficiario ${beneficiarioActualizado.nombre} ${mensaje} correctamente`;
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


  eliminarBeneficiario(id: number) {
    if (id !== undefined) {
      this.bancoAlimentoService.delete(id).subscribe(() => {
        this.cargarBeneficiarios();
      });
    }
  }


  editarBeneficiario(beneficiario: BancoDeAlimentos) {
    this.beneficiarioIdEdicion = beneficiario.id;
    this.modoEdicion = true;

    if (this.beneficiarioForm) {
      this.beneficiarioForm.patchValue({
        nombre: beneficiario.nombre,
        telefono: beneficiario.telefono,
        direccion: beneficiario.direccion,
        email: beneficiario.email,
        ciudad: beneficiario.ciudad,
        documentacionValidada: beneficiario.documentacionValidada,
        contrasenia: null
      });

      this.beneficiarioForm.get('contrasenia')?.clearValidators();
      this.beneficiarioForm.get('contrasenia')?.updateValueAndValidity();
    }
  }

}
