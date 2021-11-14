import { TestBed } from '@angular/core/testing';

import { ToEditGuard } from './to-edit.guard';

describe('ToEditGuard', () => {
  let guard: ToEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ToEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
