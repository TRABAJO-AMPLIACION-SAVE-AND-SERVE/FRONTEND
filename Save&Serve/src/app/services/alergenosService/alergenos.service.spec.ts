// import { TestBed } from '@angular/core/testing';

// import { AlergenosService } from '../alergenosService/alergenos.service';

// describe('AlergenosService', () => {
//   let service: AlergenosService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(AlergenosService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });


//Cambios leti
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlergenosService } from './alergenos.service';

describe('AlergenosService', () => {
  let service: AlergenosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlergenosService]
    });
    service = TestBed.inject(AlergenosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});