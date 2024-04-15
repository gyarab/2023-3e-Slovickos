import { TestBed } from '@angular/core/testing';

import { WordSetService } from './word-set.service';

describe('GetsetService', () => {
  let service: WordSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
