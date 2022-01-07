import { TestBed } from '@angular/core/testing';

import { AuthStopGuard } from './auth-stop.guard';

describe('AuthStopGuard', () => {
  let guard: AuthStopGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthStopGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
