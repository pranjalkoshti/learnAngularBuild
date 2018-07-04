import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAboutComponent } from './template-about.component';

describe('TemplateAboutComponent', () => {
  let component: TemplateAboutComponent;
  let fixture: ComponentFixture<TemplateAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
