import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenticeSheetComponent } from './apprentice-sheet.component';

describe('ApprenticeSheetComponent', () => {
  let component: ApprenticeSheetComponent;
  let fixture: ComponentFixture<ApprenticeSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprenticeSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprenticeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
