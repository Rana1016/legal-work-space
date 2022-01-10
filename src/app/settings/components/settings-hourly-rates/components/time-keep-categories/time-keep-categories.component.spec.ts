import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeKeepCategoriesComponent } from './time-keep-categories.component';

describe('TimeKeepCategoriesComponent', () => {
  let component: TimeKeepCategoriesComponent;
  let fixture: ComponentFixture<TimeKeepCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeKeepCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeKeepCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
