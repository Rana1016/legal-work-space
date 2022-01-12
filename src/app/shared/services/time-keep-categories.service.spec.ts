import { TestBed } from '@angular/core/testing';

import { TimeKeepCategoriesService } from './time-keep-categories.service';

describe('TimeKeepCategoriesService', () => {
  let service: TimeKeepCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeKeepCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
