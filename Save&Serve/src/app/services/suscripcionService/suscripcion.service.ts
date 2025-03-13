import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  constructor() { }
  private selectedPlan: string = '';

  private prices: Record<string, number> = {
    BASICA: 50,
    ESTANDAR: 250,
    PREMIUM: 500
  };
  setPlan(plan: string) {
    this.selectedPlan = plan;
  }

  getPlan(): string {
    return this.selectedPlan;
  }

  getPrice(): number {
    return this.prices[this.selectedPlan] || 0;
  }

}
