// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { SuscripcionService } from '../../services/suscripcionService/suscripcion.service';
// import { RegistroDataService } from '../../services/registro-data.service';
// import { Router } from '@angular/router';
// import { EmpresaService } from '../../services/empresaService/empresa.service';

// @Component({
//   selector: 'app-pasarela-pago',
//   imports: [],
//   templateUrl: './pasarela-pago.component.html',
//   styleUrl: './pasarela-pago.component.scss'
// })
// export class PasarelaPagoComponent implements OnInit, AfterViewInit {

//   plan: string = 'Premium';
//   price: number = 0;

//   constructor(private subscriptionService: SuscripcionService, private router: Router,
//     private registroDataService: RegistroDataService,
//     private empresaService: EmpresaService) { }

//   ngAfterViewInit() {
//     this.setupPaymentValidations();

//   }
//   ngOnInit() {
//     this.plan = this.subscriptionService.getPlan() || 'Premium';
//     this.price = this.subscriptionService.getPrice();
//   }

//   seleccionarPlan(plan: string) {
//     this.subscriptionService.setPlan(plan);
//     this.plan = plan;
//     this.price = this.subscriptionService.getPrice();
//   }

//   setupPaymentValidations(): void {
//     const cardNumberInput = document.getElementById('cardNumber') as HTMLInputElement;
//     const expiryDateInput = document.getElementById('expiryDate') as HTMLInputElement;
//     const cvvInput = document.getElementById('cvv') as HTMLInputElement;
//     const payButton = document.getElementById('payButton');

//     if (expiryDateInput) {
//       expiryDateInput.addEventListener('input', (e: Event) => {
//         const input = e.target as HTMLInputElement;
//         let value = input.value.replace(/\D/g, '');
//         if (value.length >= 2) {
//           value = value.slice(0, 2) + '/' + value.slice(2, 4);
//         }
//         input.value = value;
//       });
//     }

//     [cardNumberInput, cvvInput].forEach(input => {
//       if (input) {
//         input.addEventListener('input', (e: Event) => {
//           const target = e.target as HTMLInputElement;
//           target.value = target.value.replace(/\D/g, '');
//         });
//       }
//     });

//     if (payButton) {
//       payButton.addEventListener('click', (event: Event) => {
//         event.preventDefault();
//         const isPaypalActive = document.getElementById('collapseTwo')?.classList.contains('show');
//         if (isPaypalActive) {
//           if (this.validatePaypalPayment()) {
//             alert('Pago realizado con éxito (Paypal)');
//             this.processRegistration();
//           }
//         } else {
//           if (this.validateCreditCardPayment()) {
//             alert('Pago realizado con éxito (Tarjeta de crédito)');
//             this.processRegistration();
//           }
//         }
//       });
//     }
//   }

//   validateCreditCardPayment(): boolean {
//     let valid = true;
//     let firstError: HTMLElement | null = null;

//     const cardNumber = document.getElementById('cardNumber') as HTMLInputElement;
//     const expiryDate = document.getElementById('expiryDate') as HTMLInputElement;
//     const cvv = document.getElementById('cvv') as HTMLInputElement;
//     const cardNumberError = document.getElementById('cardNumberError');
//     const expiryDateError = document.getElementById('expiryDateError');
//     const cvvError = document.getElementById('cvvError');

//     if (cardNumberError) cardNumberError.classList.add('d-none');
//     if (expiryDateError) expiryDateError.classList.add('d-none');
//     if (cvvError) cvvError.classList.add('d-none');

//     if (cardNumber.value.trim() === '' || !/^\d{16}$/.test(cardNumber.value.trim())) {
//       if (cardNumberError) {
//         cardNumberError.textContent = 'Número de tarjeta debe tener 16 dígitos';
//         cardNumberError.classList.remove('d-none');
//       }
//       valid = false;
//       if (!firstError) firstError = cardNumber;
//     }

//     if (expiryDate.value.trim() === '' || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate.value.trim())) {
//       if (expiryDateError) {
//         expiryDateError.textContent = 'Formato debe ser MM/YY';
//         expiryDateError.classList.remove('d-none');
//       }
//       valid = false;
//       if (!firstError) firstError = expiryDate;
//     }

//     if (cvv.value.trim() === '' || !/^\d{3,4}$/.test(cvv.value.trim())) {
//       if (cvvError) {
//         cvvError.textContent = 'CVC debe tener 3 o 4 dígitos';
//         cvvError.classList.remove('d-none');
//       }
//       valid = false;
//       if (!firstError) firstError = cvv;
//     }

//     if (firstError) {
//       firstError.focus();
//     }
//     return valid;
//   }

//   validatePaypalPayment(): boolean {
//     let valid = true;
//     let firstError: HTMLElement | null = null;
//     const paypalEmail = document.getElementById('paypalEmail') as HTMLInputElement;
//     const paypalEmailError = document.getElementById('paypalEmailError');

//     if (paypalEmailError) paypalEmailError.classList.add('d-none');

//     if (paypalEmail.value.trim() === '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(paypalEmail.value.trim())) {
//       if (paypalEmailError) {
//         paypalEmailError.textContent = 'Correo inválido o vacío';
//         paypalEmailError.classList.remove('d-none');
//       }
//       valid = false;
//       if (!firstError) firstError = paypalEmail;
//     }

//     if (firstError) firstError.focus();
//     return valid;
//   }

//   processRegistration(): void {
//     const empresaData = this.registroDataService.getEmpresaData();
//     if (!empresaData) {
//       alert('No se encontraron datos de registro. Completa el formulario nuevamente.');
//       this.router.navigate(['/']);
//       return;
//     }
//     this.empresaService.create(empresaData).subscribe({
//       next: (response) => {
//         alert('Empresa registrada y pago realizado exitosamente');
//         this.registroDataService.clearEmpresaData();
//         this.router.navigate(['/dashboard']);
//       },
//       error: (error) => {
//         console.error('Error al registrar la empresa:', error);
//         alert('Error al registrar la empresa. Por favor, inténtelo de nuevo.');
//       }
//     });
//   }
// }

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SuscripcionService } from '../../services/suscripcionService/suscripcion.service';
import { RegistroDataService } from '../../services/registro-data.service';
import { Router } from '@angular/router';
import { EmpresaService } from '../../services/empresaService/empresa.service';

@Component({
  selector: 'app-pasarela-pago',
  imports: [],
  templateUrl: './pasarela-pago.component.html',
  styleUrl: './pasarela-pago.component.scss'
})
export class PasarelaPagoComponent implements OnInit, AfterViewInit {

  plan: string = 'Premium';
  price: number = 0;

  constructor(private subscriptionService: SuscripcionService, private router: Router,
    private registroDataService: RegistroDataService,
    private empresaService: EmpresaService) { }

  ngAfterViewInit() {
    this.setupPaymentValidations();

  }
  ngOnInit() {
    this.plan = this.subscriptionService.getPlan() || 'Premium';
    this.price = this.subscriptionService.getPrice();
  }

  seleccionarPlan(plan: string) {
    this.subscriptionService.setPlan(plan);
    this.plan = plan;
    this.price = this.subscriptionService.getPrice();
  }

  setupPaymentValidations(): void {
    const cardNumberInput = document.getElementById('cardNumber') as HTMLInputElement;
    const expiryDateInput = document.getElementById('expiryDate') as HTMLInputElement;
    const cvvInput = document.getElementById('cvv') as HTMLInputElement;
    const payButton = document.getElementById('payButton');

    if (expiryDateInput) {
      expiryDateInput.addEventListener('input', (e: Event) => {
        const input = e.target as HTMLInputElement;
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
          value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        input.value = value;
      });
    }

    [cardNumberInput, cvvInput].forEach(input => {
      if (input) {
        input.addEventListener('input', (e: Event) => {
          const target = e.target as HTMLInputElement;
          target.value = target.value.replace(/\D/g, '');
        });
      }
    });

    if (payButton) {
      payButton.addEventListener('click', (event: Event) => {
        event.preventDefault();
        const isPaypalActive = document.getElementById('collapseTwo')?.classList.contains('show');
        if (isPaypalActive) {
          if (this.validatePaypalPayment()) {
            alert('Pago realizado con éxito (Paypal)');
            this.processRegistration();
          }
        } else {
          if (this.validateCreditCardPayment()) {
            alert('Pago realizado con éxito (Tarjeta de crédito)');
            this.processRegistration();
          }
        }
      });
    }
  }

  validateCreditCardPayment(): boolean {
    let valid = true;
    let firstError: HTMLElement | null = null;

    const cardNumber = document.getElementById('cardNumber') as HTMLInputElement;
    const expiryDate = document.getElementById('expiryDate') as HTMLInputElement;
    const cvv = document.getElementById('cvv') as HTMLInputElement;
    const cardNumberError = document.getElementById('cardNumberError');
    const expiryDateError = document.getElementById('expiryDateError');
    const cvvError = document.getElementById('cvvError');

    if (cardNumberError) cardNumberError.classList.add('d-none');
    if (expiryDateError) expiryDateError.classList.add('d-none');
    if (cvvError) cvvError.classList.add('d-none');

    if (cardNumber.value.trim() === '' || !/^\d{16}$/.test(cardNumber.value.trim())) {
      if (cardNumberError) {
        cardNumberError.textContent = 'Número de tarjeta debe tener 16 dígitos';
        cardNumberError.classList.remove('d-none');
      }
      valid = false;
      if (!firstError) firstError = cardNumber;
    }

    if (expiryDate.value.trim() === '' || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate.value.trim())) {
      if (expiryDateError) {
        expiryDateError.textContent = 'Formato debe ser MM/YY';
        expiryDateError.classList.remove('d-none');
      }
      valid = false;
      if (!firstError) firstError = expiryDate;
    }

    if (cvv.value.trim() === '' || !/^\d{3,4}$/.test(cvv.value.trim())) {
      if (cvvError) {
        cvvError.textContent = 'CVC debe tener 3 o 4 dígitos';
        cvvError.classList.remove('d-none');
      }
      valid = false;
      if (!firstError) firstError = cvv;
    }

    if (firstError) {
      firstError.focus();
    }
    return valid;
  }

  validatePaypalPayment(): boolean {
    let valid = true;
    let firstError: HTMLElement | null = null;
    const paypalEmail = document.getElementById('paypalEmail') as HTMLInputElement;
    const paypalEmailError = document.getElementById('paypalEmailError');

    if (paypalEmailError) paypalEmailError.classList.add('d-none');

    if (paypalEmail.value.trim() === '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(paypalEmail.value.trim())) {
      if (paypalEmailError) {
        paypalEmailError.textContent = 'Correo inválido o vacío';
        paypalEmailError.classList.remove('d-none');
      }
      valid = false;
      if (!firstError) firstError = paypalEmail;
    }

    if (firstError) firstError.focus();
    return valid;
  }

  processRegistration(): void {
    const empresaData = this.registroDataService.getEmpresaData();
    if (!empresaData) {
      alert('No se encontraron datos de registro. Completa el formulario nuevamente.');
      this.router.navigate(['/']);
      return;
    }
    this.empresaService.create(empresaData).subscribe({
      next: (response) => {
        alert('Empresa registrada y pago realizado exitosamente');
        this.registroDataService.clearEmpresaData();
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error al registrar la empresa:', error);
        alert('Error al registrar la empresa. Por favor, inténtelo de nuevo.');
      }
    });
  }
}