import { TestBed } from '@angular/core/testing';

import { ChartsOfAccountsService } from './charts-of-accounts.service';

describe('ChartsOfAccountsService', () => {
  let service: ChartsOfAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsOfAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
