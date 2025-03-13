import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlergenosComponent } from './alergenos.component';

describe('AlergenosComponent', () => {
  let component: AlergenosComponent;
  let fixture: ComponentFixture<AlergenosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlergenosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlergenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
