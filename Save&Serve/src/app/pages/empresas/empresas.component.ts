import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmpresaDonacionComponent } from '../../components/empresa-donacion/empresa-donacion.component';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [RouterModule, CommonModule,EmpresaDonacionComponent],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.scss'
})
export class EmpresasComponent {

}

