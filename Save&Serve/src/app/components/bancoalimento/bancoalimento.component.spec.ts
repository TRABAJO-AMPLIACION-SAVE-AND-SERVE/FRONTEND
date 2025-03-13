import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoalimentoComponent } from './bancoalimento.component';

describe('BancoalimentoComponent', () => {
  let component: BancoalimentoComponent;
  let fixture: ComponentFixture<BancoalimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BancoalimentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BancoalimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
