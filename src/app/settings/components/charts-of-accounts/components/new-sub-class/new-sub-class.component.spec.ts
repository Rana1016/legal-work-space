import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubClassComponent } from './new-sub-class.component';

describe('NewSubClassComponent', () => {
  let component: NewSubClassComponent;
  let fixture: ComponentFixture<NewSubClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSubClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
