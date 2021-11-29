import { TestBed } from '@angular/core/testing';

import { PersoneService } from './persone.service';

describe('PersoneService', () => {
  let service: PersoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
