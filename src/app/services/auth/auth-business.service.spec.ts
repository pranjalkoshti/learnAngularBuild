import { TestBed, inject } from '@angular/core/testing';

import { AuthBusinessService } from './auth-business.service';

describe('AuthBusinessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthBusinessService]
    });
  });

  it('should be created', inject([AuthBusinessService], (service: AuthBusinessService) => {
    expect(service).toBeTruthy();
  }));
});
