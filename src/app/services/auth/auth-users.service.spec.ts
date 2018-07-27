import { TestBed, inject } from '@angular/core/testing';

import { AuthUsersService } from './auth-users.service';

describe('AuthUSersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthUSersService]
    });
  });

  it('should be created', inject([AuthUSersService], (service: AuthUSersService) => {
    expect(service).toBeTruthy();
  }));
});
