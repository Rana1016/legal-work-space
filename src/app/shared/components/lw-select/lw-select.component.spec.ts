import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LwSelectComponent } from './lw-select.component';

describe('LwSelectComponent', () => {
  let component: LwSelectComponent;
  let fixture: ComponentFixture<LwSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LwSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LwSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
