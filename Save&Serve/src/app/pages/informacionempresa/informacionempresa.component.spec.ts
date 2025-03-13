import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionempresaComponent } from './informacionempresa.component';

describe('InformacionempresaComponent', () => {
  let component: InformacionempresaComponent;
  let fixture: ComponentFixture<InformacionempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionempresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
