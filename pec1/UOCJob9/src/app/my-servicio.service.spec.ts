import { TestBed } from '@angular/core/testing';

import { MyServicioService } from './my-servicio.service';

describe('MyServicioService', () => {
  let service: MyServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
