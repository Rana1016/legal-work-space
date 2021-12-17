import { TestBed } from '@angular/core/testing';

import { CaseDetailService } from './case-detail.service';

describe('CaseDetailService', () => {
  let service: CaseDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
