// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Component, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';
// import { AuthService } from '../../services/autentificacion/auth.service';

// @Component({
//   selector: 'app-banco-alimentos',
//   imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
//   standalone: true,
//   templateUrl: './banco-alimentos.component.html',
//   styleUrl: './banco-alimentos.component.scss'
// })
// export class BancoAlimentosComponent  {
//   bancoAlimentos: any = {};
//   editing: {[key: string]: boolean} = {};
//   editedFields: { [key: string]: string } = {};
//   hasChanges: boolean = false;
//   bancoAlimentosForm!: FormGroup;
//   bancosAlimentos: any[] = [];
//   loadingBancoAlimentos: boolean = false;
//   errorBancoAlimentos: string | null = null;

//   constructor(
//     private bancoalimentosService: BancoalimentosService,
//     private authService: AuthService,
//     private fb: FormBuilder) 
//     {
//       this.initForm();
//     }

//   private initForm() {
//       this.bancoAlimentosForm = this.fb.group({
//         bancoDeAlimentosId: ['', Validators.required]
//       });
//     }

//   ngOnInit() {
//     this.loadBancoAlimentos();
//     this.getBancoAlimentosLogged();
//   }

//   loadBancoAlimentos() {
//     this.bancoalimentosService.getBancoAlimentos(this.bancoAlimentos.id).subscribe(data => {
//       this.bancoAlimentos = data;
//     });
//   }

//   getBancoAlimentosLogged() {
//     const userEmail = this.authService.getUserName();
//     if (userEmail) {
//       this.bancoalimentosService.getBancoAlimentosByEmail(userEmail).subscribe({
//         next: (bancoAlimentosData) => {
//           this.bancoAlimentos = bancoAlimentosData;
//           this.bancoAlimentosForm.patchValue({
//             bancoId: bancoAlimentosData.id
//           });
//         },
//         error: (error) => {
//           console.error('Error al cargar el banco de alimentos:', error);
//           alert('Error al cargar la información del banco de alimentos');
//         }
//       });
//     }
//   }

//   startEditing(field: string) {
//     this.editing[field] = true;
//     this.editedFields[field] = this.bancoAlimentos[field];
//     this.hasChanges = true;
//   }

//   cancelEdit(field: string) {
//     this.editing[field] = false;
//     this.bancoAlimentos[field] = this.editedFields[field];
//     delete this.editedFields[field];
//     if (Object.keys(this.editedFields).length === 0) {
//       this.hasChanges = false;
//     }
//   }

//   saveChanges() {
//     const bancoAlimentosUpdated = {
//       id: this.bancoAlimentos.id,
//       nombre: this.bancoAlimentos.nombre,
//       direccion: this.bancoAlimentos.direccion,
//       telefono: this.bancoAlimentos.telefono,
//       email: this.bancoAlimentos.email,
//       ciudad: this.bancoAlimentos.ciudad,
//       contrasenia: this.bancoAlimentos.contrasenia
//     };

//     this.bancoalimentosService.updateBancoAlimentos(this.bancoAlimentos.id, bancoAlimentosUpdated).subscribe({
//       next: (updateBancoAlimentos) => {
//         this.bancoAlimentos = updateBancoAlimentos;
//         this.hasChanges = false;
//         Object.keys(this.editing).forEach(key => {
//           this.editing[key] = false;
//         });
//         this.editedFields = {};
//         alert('Cambios guardados correctamente');
//       },
//       error: (error) => {
//         console.error('Error al actualizar el banco de alimentos:', error);
//         alert('Error al guardar los cambios');
//       }
//     });
//   }
// }


import { CommonModule } from '@angular/common';
import { FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';
import { DonacionService } from '../../services/donacionService/donacion.service';
import { AuthService } from '../../services/autentificacion/auth.service';

@Component({
  selector: 'app-banco-alimentos',
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './banco-alimentos.component.html',
  styleUrl: './banco-alimentos.component.scss'
})
export class BancoAlimentosComponent implements OnInit {
  bancoAlimentos: any = {};
  editing: {[key: string]: boolean} = {};
  editedFields: { [key: string]: string } = {};
  hasChanges: boolean = false;
  bancoAlimentosForm!: FormGroup;
  
  // Nuevas propiedades para donaciones
  donaciones: any[] = [];
  loadingDonaciones: boolean = false;
  errorDonaciones: string | null = null;
  updatingStates: Set<number> = new Set(); // Para controlar qué donaciones se están actualizando

  constructor(
    private bancoalimentosService: BancoalimentosService,
    private donacionService: DonacionService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  private initForm() {
    this.bancoAlimentosForm = this.fb.group({
      bancoDeAlimentosId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getBancoAlimentosLogged();
  }

  getBancoAlimentosLogged() {
    const userEmail = this.authService.getUserName();
    if (userEmail) {
      this.bancoalimentosService.getBancoAlimentosByEmail(userEmail).subscribe({
        next: (bancoAlimentosData) => {
          this.bancoAlimentos = bancoAlimentosData;
          this.bancoAlimentosForm.patchValue({
            bancoId: bancoAlimentosData.id
          });
          // Cargar donaciones después de obtener los datos del banco
          this.loadDonaciones();
        },
        error: (error) => {
          console.error('Error al cargar el banco de alimentos:', error);
          this.errorDonaciones = 'Error al cargar la información del banco de alimentos';
        }
      });
    }
  }

  loadDonaciones() {
    if (!this.bancoAlimentos.id) return;

    this.loadingDonaciones = true;
    this.errorDonaciones = null;

    // Obtener todas las donaciones para este banco
    this.donacionService.getAll().subscribe({
      next: (todasLasDonaciones) => {
        // Filtrar donaciones dirigidas a este banco y que NO estén en estado PENDIENTE
        this.donaciones = todasLasDonaciones.filter(donacion => 
          donacion.bancoDeAlimentos?.id === this.bancoAlimentos.id && 
          donacion.estadoEnvio !== 'PENDIENTE'
        );
        
        // Ordenar por fecha de entrega (más recientes primero)
        this.donaciones.sort((a, b) => {
          const fechaA = new Date(a.fechaEntrega).getTime();
          const fechaB = new Date(b.fechaEntrega).getTime();
          return fechaB - fechaA;
        });

        this.loadingDonaciones = false;
        console.log('Donaciones cargadas:', this.donaciones);
      },
      error: (error) => {
        console.error('Error al cargar donaciones:', error);
        this.errorDonaciones = 'Error al cargar las donaciones';
        this.loadingDonaciones = false;
      }
    });
  }

  actualizarEstadoDonacion(donacionId: number, nuevoEstado: string) {
    // Verificar que solo se pueda cambiar desde ENVIADO
    const donacion = this.donaciones.find(d => d.idDonacion === donacionId);
    if (!donacion || donacion.estadoEnvio !== 'ENVIADO') {
      console.warn('Solo se pueden actualizar donaciones en estado ENVIADO');
      return;
    }

    // Verificar que el nuevo estado sea válido
    if (nuevoEstado !== 'ENTREGADO' && nuevoEstado !== 'DENEGADO') {
      console.warn('Estado no válido:', nuevoEstado);
      return;
    }

    // Agregar el ID a la lista de actualizaciones en progreso
    this.updatingStates.add(donacionId);

    this.donacionService.updateEstadoDonacion(donacionId, nuevoEstado).subscribe({
      next: (donacionActualizada) => {
        console.log('Estado actualizado correctamente:', donacionActualizada);
        
        // Actualizar la donación en la lista local
        const index = this.donaciones.findIndex(d => d.idDonacion === donacionId);
        if (index !== -1) {
          this.donaciones[index].estadoEnvio = nuevoEstado;
        }

        // Remover de la lista de actualizaciones
        this.updatingStates.delete(donacionId);

        // Mostrar mensaje de éxito
        this.showSuccessMessage(nuevoEstado);
      },
      error: (error) => {
        console.error('Error al actualizar estado:', error);
        this.updatingStates.delete(donacionId);
        this.showErrorMessage();
      }
    });
  }

  private showSuccessMessage(estado: string) {
    const mensaje = estado === 'ENTREGADO' ? 
      'Donación marcada como entregada correctamente' : 
      'Donación rechazada correctamente';
    
    // Aquí podrías implementar una notificación toast o similar
    console.log(mensaje);
  }

  private showErrorMessage() {
    console.error('Error al actualizar el estado de la donación');
    // Aquí podrías implementar una notificación de error
  }

  // Métodos existentes para edición de perfil
  startEditing(field: string) {
    this.editing[field] = true;
    this.editedFields[field] = this.bancoAlimentos[field];
    this.hasChanges = true;
  }

  cancelEdit(field: string) {
    this.editing[field] = false;
    this.bancoAlimentos[field] = this.editedFields[field];
    delete this.editedFields[field];
    if (Object.keys(this.editedFields).length === 0) {
      this.hasChanges = false;
    }
  }

  saveChanges() {
    const bancoAlimentosUpdated = {
      id: this.bancoAlimentos.id,
      nombre: this.bancoAlimentos.nombre,
      direccion: this.bancoAlimentos.direccion,
      telefono: this.bancoAlimentos.telefono,
      email: this.bancoAlimentos.email,
      ciudad: this.bancoAlimentos.ciudad,
      contrasenia: this.bancoAlimentos.contrasenia
    };

    this.bancoalimentosService.updateBancoAlimentos(this.bancoAlimentos.id, bancoAlimentosUpdated).subscribe({
      next: (updateBancoAlimentos) => {
        this.bancoAlimentos = updateBancoAlimentos;
        this.hasChanges = false;
        Object.keys(this.editing).forEach(key => {
          this.editing[key] = false;
        });
        this.editedFields = {};
        console.log('Cambios guardados correctamente');
      },
      error: (error) => {
        console.error('Error al actualizar el banco de alimentos:', error);
      }
    });
  }

  // Método helper para verificar si una donación puede cambiar de estado
  canChangeState(donacion: any): boolean {
    return donacion.estadoEnvio === 'ENVIADO';
  }

  // Método helper para verificar si una donación está siendo actualizada
  isUpdating(donacionId: number): boolean {
    return this.updatingStates.has(donacionId);
  }
}