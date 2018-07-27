import { TestBed, async, inject } from '@angular/core/testing';

import { AuthBusinessGuard } from './auth-business.guard';

describe('AuthBusinessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthBusinessGuard]
    });
  });

  it('should ...', inject([AuthBusinessGuard], (guard: AuthBusinessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
