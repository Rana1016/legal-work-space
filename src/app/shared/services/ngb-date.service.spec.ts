import { TestBed } from '@angular/core/testing';

import { NgbDateService } from './ngb-date.service';

describe('NgbDateService', () => {
  let service: NgbDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgbDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
