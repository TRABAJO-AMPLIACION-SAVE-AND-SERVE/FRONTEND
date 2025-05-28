import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDonacionesComponent } from './gestion-donaciones.component';

describe('GestionDonacionesComponent', () => {
  let component: GestionDonacionesComponent;
  let fixture: ComponentFixture<GestionDonacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDonacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDonacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
