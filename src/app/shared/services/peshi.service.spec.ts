import { TestBed } from '@angular/core/testing';

import { PeshiService } from './peshi.service';

describe('PeshiService', () => {
  let service: PeshiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeshiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
