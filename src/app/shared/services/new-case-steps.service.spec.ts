import { TestBed } from '@angular/core/testing';

import { NewCaseStepsService } from './new-case-steps.service';

describe('NewCaseStepsService', () => {
  let service: NewCaseStepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewCaseStepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
