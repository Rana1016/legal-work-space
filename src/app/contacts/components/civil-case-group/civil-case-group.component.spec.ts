import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilCaseGroupComponent } from './civil-case-group.component';

describe('CivilCaseGroupComponent', () => {
  let component: CivilCaseGroupComponent;
  let fixture: ComponentFixture<CivilCaseGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CivilCaseGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilCaseGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
