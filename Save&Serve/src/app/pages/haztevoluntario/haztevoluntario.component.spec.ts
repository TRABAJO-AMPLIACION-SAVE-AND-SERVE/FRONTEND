import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaztevoluntarioComponent } from './haztevoluntario.component';

describe('HaztevoluntarioComponent', () => {
  let component: HaztevoluntarioComponent;
  let fixture: ComponentFixture<HaztevoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HaztevoluntarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HaztevoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
