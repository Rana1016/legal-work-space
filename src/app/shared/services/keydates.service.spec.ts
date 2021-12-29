import { TestBed } from '@angular/core/testing';

import { KeydatesService } from './keydates.service';

describe('KeydatesService', () => {
  let service: KeydatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeydatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
