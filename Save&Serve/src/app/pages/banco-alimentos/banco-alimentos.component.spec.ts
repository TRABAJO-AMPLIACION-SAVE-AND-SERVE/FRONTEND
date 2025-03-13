import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoAlimentosComponent } from './banco-alimentos.component';

describe('BancoAlimentosComponent', () => {
  let component: BancoAlimentosComponent;
  let fixture: ComponentFixture<BancoAlimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BancoAlimentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BancoAlimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
