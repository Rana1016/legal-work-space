import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadLinesComponent } from './dead-lines.component';

describe('DeadLinesComponent', () => {
  let component: DeadLinesComponent;
  let fixture: ComponentFixture<DeadLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeadLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
