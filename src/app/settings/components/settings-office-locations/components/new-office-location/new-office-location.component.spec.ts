import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfficeLocationComponent } from './new-office-location.component';

describe('NewOfficeLocationComponent', () => {
  let component: NewOfficeLocationComponent;
  let fixture: ComponentFixture<NewOfficeLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOfficeLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOfficeLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
