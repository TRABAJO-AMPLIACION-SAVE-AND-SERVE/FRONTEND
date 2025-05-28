//Transportes y alergenos van

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpresaService } from '../../services/empresaService/empresa.service';
import { DonacionService } from '../../services/donacionService/donacion.service';
import { DonacionComponent } from '../donacion/donacion.component';
import { AuthService } from '../../services/autentificacion/auth.service';

@Component({
  selector: 'app-empresa-donacion',
  templateUrl: './empresa-donacion.component.html',
  styleUrls: ['./empresa-donacion.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,DonacionComponent]
})
export class EmpresaDonacionComponent implements OnInit {
  empresa: any = {};
  editing: {[key: string]: boolean} = {};
  editedFields: { [key: string]: string } = {};
  hasChanges: boolean = false;
  bancos: any[] = [];
  transportes: any[] = [];
  alergenos: any[] = [];
  donacionForm!: FormGroup;
  totalDonacion: number = 0;
  loadingBancos: boolean = false;
  loadingTransportes: boolean = false;
  loadingAlergenos: boolean = false;
  errorBancos: string | null = null;
  errorTransportes: string | null = null;
  errorAlergenos: string | null = null;
  loadingDonaciones: boolean = false;
  donaciones: any[] = [];
  errorDonaciones: string | null = null;

  // new
  empresaValidada: boolean = false;
  bancosValidados: any[] = []; // En lugar de bancos: any[]

  constructor(
    private empresaService: EmpresaService,
    private donacionService: DonacionService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  private initForm() {
    this.donacionForm = this.fb.group({
    empresaId: [{value: '', disabled: true}, Validators.required],
      bancoDeAlimentosId: ['', Validators.required],
      transporteId: ['', Validators.required],
      fechaEntrega: ['', Validators.required],
      lineasProducto: this.fb.array([]),
      totalDonacion: [0]
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
  ngOnInit() {
    this.loadLoggedInEmpresa();
    this.loadBancosValidados(); //new
    this.loadTransportes();
    this.loadAlergenos();
    this.ciudades.sort((a, b) => a.localeCompare(b));
  }
  
////////////////////////////////
// Método para obtener los tipos de transporte necesarios
getTiposTransporteNecesarios(): Set<string> {
  const tipos = new Set<string>();
  this.lineasProducto.controls.forEach(control => {
    const tipoProducto = control.get('producto.tipoProducto')?.value;
    if (tipoProducto) {
      tipos.add(tipoProducto);
    }
  });
  return tipos;
}

// Método para filtrar transportes compatibles
getTransportesCompatibles(): any[] {
  const tiposNecesarios = this.getTiposTransporteNecesarios();
  if (tiposNecesarios.size === 0) return this.transportes;

  return this.transportes.filter(transporte => 
    Array.from(tiposNecesarios).every(tipo => 
      transporte.tipoTransporte.includes(tipo)
    )
  );
}

// Actualizar transportes cuando cambia un tipo de producto
actualizarTransportesDisponibles() {
  const transportesCompatibles = this.getTransportesCompatibles();
  const transporteActual = this.donacionForm.get('transporteId')?.value;

  if (transporteActual && !transportesCompatibles.find(t => t.id === transporteActual)) {
    this.donacionForm.patchValue({ transporteId: '' });
  }
}
////////////////////////////
  get lineasProducto() {
    return this.donacionForm.get('lineasProducto') as FormArray;
  }

  
  // loadLoggedInEmpresa() {
  //   const userEmail = this.authService.getUserName();
  //   if (userEmail) {
  //     this.empresaService.getEmpresaByEmail(userEmail).subscribe({
  //       next: (empresaData) => {
  //         this.empresa = empresaData;
  //         this.donacionForm.patchValue({
  //           empresaId: empresaData.id
  //         });
  //       },
  //       error: (error) => {
  //         console.error('Error al cargar la empresa:', error);
  //         alert('Error al cargar la información de la empresa');
  //       }
  //     });
  //   }
  // }


  // loadBancos() {
  //   this.loadingBancos = true;
  //   this.donacionService.getBancos().subscribe({
  //     next: (data) => {
  //       this.bancos = data;
  //       this.loadingBancos = false;
  //     },
  //     error: (error) => {
  //       this.errorBancos = 'Error al cargar los bancos de alimentos';
  //       this.loadingBancos = false;
  //     }
  //   });
  // }

  loadLoggedInEmpresa() {
    const userEmail = this.authService.getUserName();
    if (userEmail) {
      this.empresaService.getEmpresaByEmail(userEmail).subscribe({
        next: (empresaData) => {
          this.empresa = empresaData;
          this.empresaValidada = empresaData.documentacionValidada || false;
          this.donacionForm.patchValue({
            empresaId: empresaData.id
          });
        },
        error: (error) => {
          console.error('Error al cargar la empresa:', error);
          alert('Error al cargar la información de la empresa');
        }
      });
    }
  }

  loadBancosValidados() {
    this.loadingBancos = true;
    this.donacionService.getBancosValidados().subscribe({ // Nuevo método
      next: (data) => {
        this.bancosValidados = data;
        this.loadingBancos = false;
      },
      error: (error) => {
        this.errorBancos = 'Error al cargar los bancos de alimentos';
        this.loadingBancos = false;
      }
    });
  }

  loadTransportes() {
    this.loadingTransportes = true;
    this.donacionService.getTransportes().subscribe({
      next: (data) => {
        this.transportes = data;
        this.loadingTransportes = false;
      },
      error: (error) => {
        this.errorTransportes = 'Error al cargar los transportes';
        this.loadingTransportes = false;
      }
    });
  }


  loadAlergenos() {
    this.loadingAlergenos = true;
    this.donacionService.getAlergenos().subscribe({
      next: (data) => {
        this.alergenos = data || [];
        this.loadingAlergenos = false;
        console.log('Alérgenos cargados:', this.alergenos);
      },
      error: (error) => {
        console.error('Error cargando alérgenos:', error);
        this.errorAlergenos = 'Error al cargar los alérgenos';
        this.alergenos = [];
        this.loadingAlergenos = false;
      }
    });
  }

  addLineaProducto() {
    const lineaProducto = this.fb.group({
      producto: this.fb.group({
        nombre: ['', Validators.required],
        precio: [0, [Validators.required, Validators.min(0)]],
        tipoProducto: ['', Validators.required],
     //   tipoTransporte: ['', Validators.required]
      }),
      cantidad: [1, [Validators.required, Validators.min(1)]],
      subtotal: [{value: 0, disabled: true}],
      alergenos: this.fb.array([])
    });

    const alergenosArray = lineaProducto.get('alergenos') as FormArray;
    this.alergenos.forEach(() => {
      alergenosArray.push(this.fb.control(false));
    });

    // Configurar los listeners para el cálculo automático
    const cantidad = lineaProducto.get('cantidad');
    const precio = lineaProducto.get('producto.precio');
    const tipoProducto = lineaProducto.get('producto.tipoProducto');

    if (cantidad && precio) {
      cantidad.valueChanges.subscribe(() => this.calculateSubtotal(lineaProducto));
      precio.valueChanges.subscribe(() => this.calculateSubtotal(lineaProducto));
    }
////////////
    if (tipoProducto) {
      tipoProducto.valueChanges.subscribe(() => {
        this.actualizarTransportesDisponibles();
      });
    }
////////
    this.lineasProducto.push(lineaProducto);
  }

  removeLineaProducto(index: number) {
    this.lineasProducto.removeAt(index);
    this.calculateTotal();
  }

  calculateSubtotal(lineaProducto: FormGroup) {
    const cantidad = lineaProducto.get('cantidad')?.value || 0;
    const precio = lineaProducto.get('producto.precio')?.value || 0;
    lineaProducto.patchValue({
      subtotal: cantidad * precio
    }, {emitEvent: false});
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalDonacion = this.lineasProducto.controls
      .map(control => control.get('subtotal')?.value || 0)
      .reduce((acc, current) => acc + current, 0);
    this.donacionForm.patchValue({
      totalDonacion: this.totalDonacion
    }, {emitEvent: false});
  }

  private generateProductId(nombre: string): string {
    const timestamp = new Date().getTime();
    const nombreNormalizado = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `PRD-${nombreNormalizado.substring(0, 5)}-${timestamp}`;
  }

  startEditing(field: string) {
    this.editing[field] = true;
    this.editedFields[field] = this.empresa[field];
    this.hasChanges = true;
  }

  cancelEdit(field: string) {
    this.editing[field] = false;
    this.empresa[field] = this.editedFields[field];
    delete this.editedFields[field];
    if (Object.keys(this.editedFields).length === 0) {
      this.hasChanges = false;
    }
  }

  // saveChanges() {
  //   this.empresaService.updateEmpresa(this.empresa.id, this.empresa).subscribe({
  //     next: (updatedEmpresa) => {
  //       this.empresa = updatedEmpresa;
  //       this.hasChanges = false;
  //       Object.keys(this.editing).forEach(key => {
  //         this.editing[key] = false;
  //       });
  //       this.editedFields = {};
  //       alert('Cambios guardados correctamente');
  //     },
  //     error: (error) => {
  //       console.error('Error al actualizar la empresa:', error);
  //       alert('Error al guardar los cambios');
  //     }
  //   });
  // }

  saveChanges() {
    // Crear un objeto con solo los campos editados
    const empresaActualizada = {
        id: this.empresa.id,
        nombre: this.empresa.nombre,
        email: this.empresa.email,
        direccion: this.empresa.direccion,
        telefono: this.empresa.telefono,
        cif: this.empresa.cif,
        ciudad: this.empresa.ciudad,
        suscripcion: this.empresa.suscripcion
    };

    this.empresaService.updateEmpresa(this.empresa.id, empresaActualizada).subscribe({
        next: (updatedEmpresa) => {
            this.empresa = updatedEmpresa;
            this.hasChanges = false;
            Object.keys(this.editing).forEach(key => {
                this.editing[key] = false;
            });
            this.editedFields = {};
            alert('Cambios guardados correctamente');
        },
        error: (error) => {
            console.error('Error al actualizar la empresa:', error);
            alert('Error al guardar los cambios: ' + 
                  (error.error?.message || 'No se pudieron guardar los cambios'));
        }
    });
}

  //Esto no se si va
  // loadDonaciones() {
  //   if (this.empresa?.id) {
  //     this.loadingDonaciones = true;
  //     this.donacionService.getDonacionesByEmpresa(this.empresa.id).subscribe({
  //       next: (donaciones) => {
  //         this.donaciones = donaciones;
  //         this.loadingDonaciones = false;
  //         console.log('Donaciones cargadas:', this.donaciones);
  //       },
  //       error: (error) => {
  //         console.error('Error al cargar donaciones:', error);
  //         this.errorDonaciones = 'Error al cargar las donaciones';
  //         this.donaciones = [];
  //         this.loadingDonaciones = false;
  //       }
  //     });
  //   }
  // }

onSubmit() {
  if (this.donacionForm.valid) {
    try {
      const donacion = this.prepareDonacionData();
      console.log('Datos de donación a enviar:', donacion); // Para depuración

      this.donacionService.createDonacion(donacion).subscribe({
        next: (response) => {
          console.log('Donación creada exitosamente:', response);
          this.resetForm();
          alert('Donación creada con éxito');
        },
        error: (error) => {
          console.error('Error al crear la donación:', error);
          let errorMessage = 'Error al crear la donación';
          if (error.error?.message) {
            errorMessage += `: ${error.error.message}`;
          } else if (error.message) {
            errorMessage += `: ${error.message}`;
          }
          alert(errorMessage);
        }
      });
    } catch (error) {
      console.error('Error al preparar los datos de la donación:', error);
      alert('Error al preparar los datos de la donación');
    }
  } else {
    console.warn('Formulario inválido:', this.findFormErrors(this.donacionForm));
    this.markFormGroupTouched(this.donacionForm);
    alert('Por favor, complete todos los campos requeridos correctamente');
  }
}

private prepareDonacionData() {
  const formValue = this.donacionForm.getRawValue();
  
  if (!formValue.fechaEntrega) {
    throw new Error('La fecha de entrega es requerida');
  }

  if (!this.empresa?.id) {
    throw new Error('No se ha podido identificar la empresa');
  }

  return {
    fechaEntrega: formValue.fechaEntrega,
    empresa: { id: this.empresa.id },
    bancoDeAlimentos: { id: formValue.bancoDeAlimentosId },
    transporte: { id: formValue.transporteId },
    estadoEnvio: 'PENDIENTE',
    lineasProducto: this.prepareLineasProducto(formValue.lineasProducto),
    totalDonacion: this.totalDonacion
  };
}

private prepareLineasProducto(lineas: any[]) {
  if (!lineas || lineas.length === 0) {
    throw new Error('Debe agregar al menos una línea de producto');
  }

  return lineas.map(linea => {
    if (!linea.producto.nombre || !linea.producto.precio || !linea.producto.tipoProducto) {
      throw new Error('Todos los campos del producto son requeridos');
    }

    return {
      producto: {
        nombre: linea.producto.nombre,
        idProducto: this.generateProductId(linea.producto.nombre),
        precio: linea.producto.precio,
        tipoProducto: linea.producto.tipoProducto,
        tipoTransporte: linea.producto.tipoProducto, // Mismo valor que tipoProducto
        alergenos: this.prepareAlergenos(linea.alergenos)
      },
      cantidad: linea.cantidad,
      precioUnitario: linea.producto.precio,
      subtotal: linea.cantidad * linea.producto.precio
    };
  });
}

private prepareAlergenos(alergenosSeleccionados: boolean[]) {
  return alergenosSeleccionados
    .map((checked, index) => checked ? this.alergenos[index] : null)
    .filter(alergeno => alergeno !== null);
}

private findFormErrors(formGroup: FormGroup): string[] {
  const errors: string[] = [];
  Object.keys(formGroup.controls).forEach(key => {
    const control = formGroup.get(key);
    if (control instanceof FormGroup) {
      errors.push(...this.findFormErrors(control));
    } else if (control?.errors) {
      errors.push(`${key}: ${Object.keys(control.errors).join(', ')}`);
    }
  });
  return errors;
}

private markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();
    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control);
    } else if (control instanceof FormArray) {
      (control as FormArray).controls.forEach(arrayControl => {
        if (arrayControl instanceof FormGroup) {
          this.markFormGroupTouched(arrayControl);
        }
      });
    }
  });
}

private resetForm() {
  this.donacionForm.reset({
    empresaId: this.empresa?.id,
    bancoDeAlimentosId: '',
    transporteId: '',
    fechaEntrega: null,
    lineasProducto: [],
    totalDonacion: 0
  });
  
  while (this.lineasProducto.length !== 0) {
    this.lineasProducto.removeAt(0);
  }
  
  this.totalDonacion = 0;
}


}
