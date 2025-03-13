// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

// import { AppComponent } from './app.component';
// import { NavbarComponent } from './components/navbar-component/navbar-component.component';
// import { FooterComponent } from './components/footer-component/footer-component.component'; 
// import { HerosectionComponent } from './components/herosection-component/herosection-component.component';
// import { HowworksComponent } from './components/howworks-component/howworks-component.component';
// import { AppRoutingModule } from './app-routing.module';
// import { HttpClientModule } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { SuscripcionService } from './services/suscripcionService/suscripcion.service';


// @NgModule({
//   imports: [
//     BrowserModule,
//     FormsModule,
//     NgbModule,
//     AppRoutingModule,
//     AppComponent,
//     NavbarComponent,
//     FooterComponent,
//     HerosectionComponent,
//     HowworksComponent,
//     HttpClientModule,
//     ReactiveFormsModule,
//     CommonModule
    
//   ],
//   providers: [SuscripcionService],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }





// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// import { AppComponent } from './app.component';
// import { NavbarComponent } from './components/navbar-component/navbar-component.component';
// import { FooterComponent } from './components/footer-component/footer-component.component'; 
// import { HerosectionComponent } from './components/herosection-component/herosection-component.component';
// import { HowworksComponent } from './components/howworks-component/howworks-component.component';
// import { AppRoutingModule } from './app-routing.module';
// import { CommonModule } from '@angular/common';

// // Importaciones de servicios
// import { SuscripcionService } from './services/suscripcionService/suscripcion.service';
// import { AuthService } from './services/autentificacion/auth.service';

// // Importar el interceptor de autenticación
// import { AuthInterceptor } from './auth';

// //importo para el router
// import { RouterModule } from '@angular/router';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     FormsModule,
//     ReactiveFormsModule,
//     NgbModule,
//     AppRoutingModule,
//     HttpClientModule,
//     CommonModule,
//     // Componentes standalone
//     NavbarComponent,
//     FooterComponent,
//     HerosectionComponent,
//     HowworksComponent,
//     RouterModule //nuevo
//   ],
//   providers: [
//     SuscripcionService,
//     AuthService,
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: AuthInterceptor,
//       multi: true
//     }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Elimina la importación de AppComponent
import { NavbarComponent } from './components/navbar-component/navbar-component.component';
import { FooterComponent } from './components/footer-component/footer-component.component'; 
import { HerosectionComponent } from './components/herosection-component/herosection-component.component';
import { HowworksComponent } from './components/howworks-component/howworks-component.component';
//import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

// Importaciones de servicios
import { SuscripcionService } from './services/suscripcionService/suscripcion.service';
import { AuthService } from './services/autentificacion/auth.service';

// Importar el interceptor de autenticación
import { AuthInterceptor } from './auth';

//importo para el router
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    // Elimina AppComponent de aquí
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
   // AppRoutingModule,
    HttpClientModule,
    CommonModule,
    // Componentes standalone
    NavbarComponent,
    FooterComponent,
    HerosectionComponent,
    HowworksComponent,
    RouterModule
  ],
  providers: [
    SuscripcionService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [] // Elimina AppComponent de aquí
})
export class AppModule { }