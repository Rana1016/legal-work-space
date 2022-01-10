import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSubCategoriesComponent } from './case-sub-categories.component';

describe('CaseSubCategoriesComponent', () => {
  let component: CaseSubCategoriesComponent;
  let fixture: ComponentFixture<CaseSubCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseSubCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
