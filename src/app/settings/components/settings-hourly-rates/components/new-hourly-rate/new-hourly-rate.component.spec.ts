import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHourlyRateComponent } from './new-hourly-rate.component';

describe('NewHourlyRateComponent', () => {
  let component: NewHourlyRateComponent;
  let fixture: ComponentFixture<NewHourlyRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHourlyRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHourlyRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
