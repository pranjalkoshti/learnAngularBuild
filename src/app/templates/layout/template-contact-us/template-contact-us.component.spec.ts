import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateContactUsComponent } from './template-contact-us.component';

describe('TemplateContactUsComponent', () => {
  let component: TemplateContactUsComponent;
  let fixture: ComponentFixture<TemplateContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
