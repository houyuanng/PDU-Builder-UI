import { TestBed } from '@angular/core/testing';

import { PassInsertsDataServiceService } from './pass-inserts-data-service.service';

describe('PassInsertsDataServiceService', () => {
  let service: PassInsertsDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassInsertsDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
