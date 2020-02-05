import { TestBed } from '@angular/core/testing';

import { RideInfoService } from './ride-info.service';

describe('RideInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RideInfoService = TestBed.get(RideInfoService);
    expect(service).toBeTruthy();
  });
});
