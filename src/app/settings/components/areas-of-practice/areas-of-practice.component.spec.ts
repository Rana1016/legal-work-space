import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasOfPracticeComponent } from './areas-of-practice.component';

describe('AreasOfPracticeComponent', () => {
  let component: AreasOfPracticeComponent;
  let fixture: ComponentFixture<AreasOfPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasOfPracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasOfPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
