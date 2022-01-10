import { TestBed } from '@angular/core/testing';

import { LogbookFolderService } from './logbook-folder.service';

describe('LogbookFolderService', () => {
  let service: LogbookFolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogbookFolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
