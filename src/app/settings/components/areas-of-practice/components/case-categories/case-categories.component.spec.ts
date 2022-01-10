import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseCategoriesComponent } from './case-categories.component';

describe('CaseCategoriesComponent', () => {
  let component: CaseCategoriesComponent;
  let fixture: ComponentFixture<CaseCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
