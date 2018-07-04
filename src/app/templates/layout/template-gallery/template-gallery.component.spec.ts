import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateGalleryComponent } from './template-gallery.component';

describe('TemplateGalleryComponent', () => {
  let component: TemplateGalleryComponent;
  let fixture: ComponentFixture<TemplateGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
