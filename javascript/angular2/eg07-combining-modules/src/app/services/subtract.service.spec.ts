import { TestBed, inject } from '@angular/core/testing';

import { SubtractService } from './subtract.service';

describe('SubtractService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubtractService]
    });
  });

  it('should be created', inject([SubtractService], (service: SubtractService) => {
    expect(service).toBeTruthy();
  }));
});
