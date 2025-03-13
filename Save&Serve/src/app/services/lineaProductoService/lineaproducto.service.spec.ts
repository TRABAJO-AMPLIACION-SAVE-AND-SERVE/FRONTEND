import { TestBed } from '@angular/core/testing';

import { LineaProductoService } from '../lineaProductoService/lineaproducto.service';

describe('LineaProductoService', () => {
  let service: LineaProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineaProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
