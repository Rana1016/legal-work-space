import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaseSubCategoryComponent } from './new-case-sub-category.component';

describe('NewCaseSubCategoryComponent', () => {
  let component: NewCaseSubCategoryComponent;
  let fixture: ComponentFixture<NewCaseSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCaseSubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCaseSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
