import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceNotesComponent } from './attendance-notes.component';

describe('AttendanceNotesComponent', () => {
  let component: AttendanceNotesComponent;
  let fixture: ComponentFixture<AttendanceNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
