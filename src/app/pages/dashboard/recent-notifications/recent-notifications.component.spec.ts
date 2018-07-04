import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentNotificationsComponent } from './recent-notifications.component';

describe('RecentNotificationsComponent', () => {
  let component: RecentNotificationsComponent;
  let fixture: ComponentFixture<RecentNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
