import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaseCategoryComponent } from './new-case-category.component';

describe('NewCaseCategoryComponent', () => {
  let component: NewCaseCategoryComponent;
  let fixture: ComponentFixture<NewCaseCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCaseCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCaseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
