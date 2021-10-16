import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeActivityCodesComponent } from './time-activity-codes.component';

describe('TimeActivityCodesComponent', () => {
  let component: TimeActivityCodesComponent;
  let fixture: ComponentFixture<TimeActivityCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeActivityCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeActivityCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
