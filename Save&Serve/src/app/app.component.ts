// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { NavbarComponent } from './components/navbar-component/navbar-component.component';
// import { FooterComponent } from './components/footer-component/footer-component.component';
// import { ArticuloService } from './services/articuloService/articulo.service';
// import { ScrolltopComponent } from './components/scrolltop/scrolltop.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterModule,NavbarComponent,FooterComponent, ScrolltopComponent],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'SaveAndServe';
// }


//pequeñas cosas 

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


// Componentes standalone
import { NavbarComponent } from './components/navbar-component/navbar-component.component';
import { FooterComponent } from './components/footer-component/footer-component.component';
import { ScrolltopComponent } from './components/scrolltop/scrolltop.component';

// Opcional: servicios que necesites usar globalmente
import { ArticuloService } from './services/articuloService/articulo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    NavbarComponent,
    FooterComponent, 
    ScrolltopComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SaveAndServe';

  // Si necesitas usar el servicio de artículos, puedes inyectarlo en el constructor
  constructor(private articuloService: ArticuloService) {}
}