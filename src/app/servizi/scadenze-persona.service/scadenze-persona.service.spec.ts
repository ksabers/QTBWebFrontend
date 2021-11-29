import { TestBed } from '@angular/core/testing';

import { ScadenzePersonaService } from './scadenze-persona.service';

describe('ScadenzePersonaService', () => {
  let service: ScadenzePersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScadenzePersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
