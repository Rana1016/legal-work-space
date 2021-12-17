import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPeshiComponent } from './new-peshi.component';

describe('NewPeshiComponent', () => {
  let component: NewPeshiComponent;
  let fixture: ComponentFixture<NewPeshiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPeshiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPeshiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
