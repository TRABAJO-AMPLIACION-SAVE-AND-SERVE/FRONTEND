import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaDonacionComponent } from './empresa-donacion.component';

describe('EmpresaDonacionComponent', () => {
  let component: EmpresaDonacionComponent;
  let fixture: ComponentFixture<EmpresaDonacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaDonacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaDonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
