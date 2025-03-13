import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroDataService {

  constructor() { }
  private empresaData: Empresa | null = null;

  setEmpresaData(data: Empresa): void {
    this.empresaData = data;
  }

  getEmpresaData(): Empresa | null {
    return this.empresaData;
  }

  clearEmpresaData(): void {
    this.empresaData = null;
  }
}
