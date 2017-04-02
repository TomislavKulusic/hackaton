/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InfoService } from './infoservice.service';

describe('Service: Comments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoService]
    });
  });

  it('should ...', inject([InfoService], (service: InfoService) => {
    expect(service).toBeTruthy();
  }));
});
