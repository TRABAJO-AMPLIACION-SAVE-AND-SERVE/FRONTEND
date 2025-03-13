import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBeneficiariosComponent } from './gestion-beneficiarios.component';

describe('GestionBeneficiariosComponent', () => {
  let component: GestionBeneficiariosComponent;
  let fixture: ComponentFixture<GestionBeneficiariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionBeneficiariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionBeneficiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
