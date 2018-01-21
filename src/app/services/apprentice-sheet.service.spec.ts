import { TestBed, inject } from '@angular/core/testing';

import { ApprenticeSheetService } from './apprentice-sheet.service';

describe('ApprenticeSheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApprenticeSheetService]
    });
  });

  it('should be created', inject([ApprenticeSheetService], (service: ApprenticeSheetService) => {
    expect(service).toBeTruthy();
  }));
});
