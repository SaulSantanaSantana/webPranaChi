import { TestBed } from '@angular/core/testing';

import { NorificationsService } from './norifications.service';

describe('NorificationsService', () => {
  let service: NorificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NorificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
