import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTimeKeepSubCategoryComponent } from './new-time-keep-sub-category.component';

describe('NewTimeKeepSubCategoryComponent', () => {
  let component: NewTimeKeepSubCategoryComponent;
  let fixture: ComponentFixture<NewTimeKeepSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTimeKeepSubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTimeKeepSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
