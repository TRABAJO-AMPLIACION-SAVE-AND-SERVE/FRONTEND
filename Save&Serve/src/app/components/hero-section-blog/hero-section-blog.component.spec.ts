import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionBlogComponent } from './hero-section-blog.component';

describe('HeroSectionBlogComponent', () => {
  let component: HeroSectionBlogComponent;
  let fixture: ComponentFixture<HeroSectionBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSectionBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
