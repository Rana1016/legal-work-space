import { TestBed } from '@angular/core/testing';

import { CaseCategoriesService } from './case-categories.service';

describe('CaseCategoriesService', () => {
  let service: CaseCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
