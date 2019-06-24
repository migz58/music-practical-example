import { TestBed } from '@angular/core/testing';

import { MusicdbappService } from './musicdbapp.service';

describe('MusicdbappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusicdbappService = TestBed.get(MusicdbappService);
    expect(service).toBeTruthy();
  });
});
