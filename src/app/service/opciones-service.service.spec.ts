import { TestBed } from '@angular/core/testing';

import { OpcionesServiceService } from './opciones-service.service';

describe('OpcionesServiceService', () => {
  let service: OpcionesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpcionesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
