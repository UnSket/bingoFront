import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSheetComponent } from './teacher-sheet.component';

describe('TeacherSheetComponent', () => {
  let component: TeacherSheetComponent;
  let fixture: ComponentFixture<TeacherSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
