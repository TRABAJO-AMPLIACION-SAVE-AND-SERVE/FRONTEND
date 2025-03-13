import { CommonModule } from '@angular/common';
import { FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';
import { AuthService } from '../../services/autentificacion/auth.service';

@Component({
  selector: 'app-banco-alimentos',
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './banco-alimentos.component.html',
  styleUrl: './banco-alimentos.component.scss'
})
export class BancoAlimentosComponent  {
  bancoAlimentos: any = {};
  editing: {[key: string]: boolean} = {};
  editedFields: { [key: string]: string } = {};
  hasChanges: boolean = false;
  bancoAlimentosForm!: FormGroup;
  bancosAlimentos: any[] = [];
  loadingBancoAlimentos: boolean = false;
  errorBancoAlimentos: string | null = null;

  constructor(
    private bancoalimentosService: BancoalimentosService,
    private authService: AuthService,
    private fb: FormBuilder) 
    {
      this.initForm();
    }

  private initForm() {
      this.bancoAlimentosForm = this.fb.group({
        bancoDeAlimentosId: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.loadBancoAlimentos();
    this.getBancoAlimentosLogged();
  }

  loadBancoAlimentos() {
    this.bancoalimentosService.getBancoAlimentos(this.bancoAlimentos.id).subscribe(data => {
      this.bancoAlimentos = data;
    });
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
        },
        error: (error) => {
          console.error('Error al cargar el banco de alimentos:', error);
          alert('Error al cargar la información del banco de alimentos');
        }
      });
    }
  }

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
        alert('Cambios guardados correctamente');
      },
      error: (error) => {
        console.error('Error al actualizar el banco de alimentos:', error);
        alert('Error al guardar los cambios');
      }
    });
  }
}
