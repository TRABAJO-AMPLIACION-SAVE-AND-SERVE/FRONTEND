import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTransportesComponent } from './gestion-transportes.component';

describe('GestionTransportesComponent', () => {
  let component: GestionTransportesComponent;
  let fixture: ComponentFixture<GestionTransportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionTransportesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionTransportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
