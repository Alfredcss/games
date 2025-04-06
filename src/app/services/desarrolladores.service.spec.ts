import { TestBed } from '@angular/core/testing';

import { DesarrolladorService } from './desarrolladores.service';

describe('DesarrolladoresService', () => {
  let service: DesarrolladorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesarrolladorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
