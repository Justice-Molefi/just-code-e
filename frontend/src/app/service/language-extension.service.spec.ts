import { TestBed } from '@angular/core/testing';

import { LanguageExtensionService } from './language-extension.service';

describe('LanguageExtensionService', () => {
  let service: LanguageExtensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageExtensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
