import { TestBed } from '@angular/core/testing';

import { ScadenzeService } from './scadenze.service';

describe('ScadenzeService', () => {
  let service: ScadenzeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScadenzeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
