import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseActivitiesComponent } from './case-activities.component';

describe('CaseActivitiesComponent', () => {
  let component: CaseActivitiesComponent;
  let fixture: ComponentFixture<CaseActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
