import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMainClassComponent } from './new-main-class.component';

describe('NewMainClassComponent', () => {
  let component: NewMainClassComponent;
  let fixture: ComponentFixture<NewMainClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMainClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMainClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
