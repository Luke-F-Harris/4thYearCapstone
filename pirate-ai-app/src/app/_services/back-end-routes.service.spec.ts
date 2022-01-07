import { TestBed } from '@angular/core/testing';

import { BackEndRoutesService } from './back-end-routes.service';

describe('BackEndRoutesService', () => {
  let service: BackEndRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackEndRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
