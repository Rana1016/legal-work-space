import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTimeKeepCategoryComponent } from './new-time-keep-category.component';

describe('NewTimeKeepCategoryComponent', () => {
  let component: NewTimeKeepCategoryComponent;
  let fixture: ComponentFixture<NewTimeKeepCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTimeKeepCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTimeKeepCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
