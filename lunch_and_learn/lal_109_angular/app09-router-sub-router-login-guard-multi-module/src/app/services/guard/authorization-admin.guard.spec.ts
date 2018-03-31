import { TestBed, async, inject } from '@angular/core/testing';

import { AuthorizationAdminGuard } from './authorization-admin.guard';

describe('AuthorizationAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationAdminGuard]
    });
  });

  it('should ...', inject([AuthorizationAdminGuard], (guard: AuthorizationAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
