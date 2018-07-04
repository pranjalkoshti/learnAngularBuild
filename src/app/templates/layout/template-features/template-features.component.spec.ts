import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFeaturesComponent } from './template-features.component';

describe('TemplateFeaturesComponent', () => {
  let component: TemplateFeaturesComponent;
  let fixture: ComponentFixture<TemplateFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
