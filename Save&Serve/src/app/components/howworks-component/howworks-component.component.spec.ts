import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowworksComponent} from './howworks-component.component';

describe('HowworksComponent', () => {
  let component: HowworksComponent;
  let fixture: ComponentFixture<HowworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowworksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
