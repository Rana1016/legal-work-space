import { TestBed } from '@angular/core/testing';

import { NonClientAuthGuard } from './non-client-auth.guard';

describe('NonClientAuthGuard', () => {
  let guard: NonClientAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NonClientAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
