import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaProductoComponent } from './linea-producto.component';

describe('LineaProductoComponent', () => {
  let component: LineaProductoComponent;
  let fixture: ComponentFixture<LineaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineaProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
