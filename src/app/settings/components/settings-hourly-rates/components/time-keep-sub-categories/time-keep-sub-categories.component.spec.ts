import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeKeepSubCategoriesComponent } from './time-keep-sub-categories.component';

describe('TimeKeepSubCategoriesComponent', () => {
  let component: TimeKeepSubCategoriesComponent;
  let fixture: ComponentFixture<TimeKeepSubCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeKeepSubCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeKeepSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
