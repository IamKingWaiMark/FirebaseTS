import { TestBed } from '@angular/core/testing';

import { FirebaseTSAuthBootstrapService } from './firebaseTSAuthService.service';

describe('FirebaseTSAuthBootstrapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseTSAuthBootstrapService = TestBed.get(FirebaseTSAuthBootstrapService);
    expect(service).toBeTruthy();
  });
});
