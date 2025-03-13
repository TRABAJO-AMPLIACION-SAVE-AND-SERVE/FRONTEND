import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionArticulosComponent } from './gestion-articulos.component';

describe('GestionArticulosComponent', () => {
  let component: GestionArticulosComponent;
  let fixture: ComponentFixture<GestionArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionArticulosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
