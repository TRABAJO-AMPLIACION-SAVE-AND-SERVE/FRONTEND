import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuscripcionService } from '../../services/suscripcionService/suscripcion.service';
import { AuthService } from '../../services/autentificacion/auth.service';
import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';
import { BancoDeAlimentos } from '../../models/bancoAlimentos.model';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresaService/empresa.service';
import { RegistroDataService } from '../../services/registro-data.service';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.scss']
})
export class NavbarComponent implements OnInit {
  beneficiarioForm!: FormGroup;
  empresaForm!: FormGroup;
  searchTerm: string = '';
  selectedPlan: string = 'BASICA';


  loginData = {
    email: '',
    password: ''
  };

  isLoggedIn: boolean = false;
  userRole: string | null = null;
  userName: string | null = null;
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

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private subscriptionService: SuscripcionService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private bancoAlimentoService: BancoalimentosService,
    private empresaService: EmpresaService,
    private registroDataService: RegistroDataService,
  ) { }

  ngOnInit(): void {
    this.checkAuthStatus();
    this.initForm();
    this.initEmpresaForm();
    this.selectedPlan = this.subscriptionService.getPlan() || 'BASICA';
    this.ciudades.sort((a, b) => a.localeCompare(b));


  }
  private initForm(): void {
    this.beneficiarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      ciudadEmpresa: ['', Validators.required],
      direccion: ['', Validators.required],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  private initEmpresaForm(): void {
    this.empresaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      cif: ['', [Validators.required, Validators.minLength(9)]],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      suscripcion: [this.selectedPlan]
    });
  }
  private checkAuthStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.userRole = this.authService.getUserRole();
      this.userName = this.authService.getUserName();
    }
  }
  agregarBeneficiario() {
    if (this.beneficiarioForm.invalid) {
      Object.keys(this.beneficiarioForm.controls).forEach(key => {
        const control = this.beneficiarioForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    const beneficiario: BancoDeAlimentos = {
      nombre: this.beneficiarioForm.value.nombre,
      telefono: this.beneficiarioForm.value.telefono,
      email: this.beneficiarioForm.value.email,
      ciudad: this.beneficiarioForm.value.ciudadEmpresa,
      direccion: this.beneficiarioForm.value.direccion,
      contrasenia: this.beneficiarioForm.value.contrasenia
    };

    console.log('Enviando beneficiario:', beneficiario); // Para debugging

    this.bancoAlimentoService.create(beneficiario).subscribe({
      next: (response) => {
        console.log('Respuesta:', response); // Para debugging
        alert('Beneficiario registrado exitosamente');
        this.beneficiarioForm.reset();
       
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        alert('Error al registrar el beneficiario. Por favor, inténtelo de nuevo.');
      }
    });
  }
  registrarEmpresa() {
    if (this.empresaForm.invalid) {
      Object.keys(this.empresaForm.controls).forEach(key => {
        const control = this.empresaForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    const empresa: Empresa = {
      ...this.empresaForm.value,
      suscripcion: this.selectedPlan  
    };

    this.empresaService.create(empresa).subscribe({
      next: (response: any) => {
        console.log('Empresa registrada:', response);
        alert('Empresa registrada exitosamente');
        this.empresaForm.reset();
        this.router.navigate(['/pasarelaPago']);
      },
      error: (error: any) => {
        console.error('Error al registrar:', error);
        alert('Error al registrar la empresa. Por favor, inténtelo de nuevo.');
      }
    });
  }

  onLogin() {
    this.authService.login(this.loginData.email, this.loginData.password)
      .subscribe({
        next: (response: any) => {
          this.checkAuthStatus();
          this.navigateBasedOnRole(this.userRole);

          alert(`¡Bienvenido, ${this.userName}!`);

          this.modalService.dismissAll();
        },
        error: (error: any) => {
          console.error('Error de inicio de sesión', error);
          alert('Error al iniciar sesión. Compruebe sus credenciales.');
        }
      });
  }

  logout() {
    const logoutName = this.userName || 'usuario';
    this.authService.logout();
    this.checkAuthStatus();
    alert(`¡Hasta luego, ${logoutName}!`);
    this.router.navigate(['/']);
  }


  private navigateBasedOnRole(role: string | null) {
    switch (role) {
      case 'EMPRESA':
        this.router.navigate(['/empresas-donacion']);
        break;
      case 'ADMIN':
        this.router.navigate(['/zonaAdmin']);
        break;
      case 'BANCO_DE_ALIMENTOS':
        this.router.navigate(['/banco-alimentos']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchTerm }
      });
    }
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  }
  selectPlan(plan: string): void {
    this.selectedPlan = plan;
    this.subscriptionService.setPlan(plan);
    this.empresaForm.patchValue({ suscripcion: plan });
  }

  goToPayment(): void {
    if (this.empresaForm.invalid) {
      Object.keys(this.empresaForm.controls).forEach(key => {
        const control = this.empresaForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }
    this.registroDataService.setEmpresaData(this.empresaForm.value);
    this.router.navigate(['/pasarelaPago']);
  }
}