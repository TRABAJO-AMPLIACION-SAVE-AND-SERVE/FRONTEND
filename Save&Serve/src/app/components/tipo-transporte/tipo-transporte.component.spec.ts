import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTransporteComponent } from './tipo-transporte.component';

describe('TipoTransporteComponent', () => {
  let component: TipoTransporteComponent;
  let fixture: ComponentFixture<TipoTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoTransporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
