import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaAdminComponent } from './zona-admin.component';

describe('ZonaAdminComponent', () => {
  let component: ZonaAdminComponent;
  let fixture: ComponentFixture<ZonaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonaAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
