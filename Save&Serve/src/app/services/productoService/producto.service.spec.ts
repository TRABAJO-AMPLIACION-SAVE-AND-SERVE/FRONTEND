// import { TestBed } from '@angular/core/testing';

// import { ProductoService } from '../productoService/producto.service';

// describe('ProductoService', () => {
//   let service: ProductoService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(ProductoService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });


//Cambios leti 

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductoService } from './producto.service';

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductoService]
    });
    service = TestBed.inject(ProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});