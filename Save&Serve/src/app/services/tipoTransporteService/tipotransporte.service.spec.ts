import { TestBed } from '@angular/core/testing';

import { TipoTransporteService } from '../tipoTransporteService/tipotransporte.service';

describe('TipotransporteService', () => {
  let service: TipoTransporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoTransporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
