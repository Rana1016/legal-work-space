import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKeydateComponent } from './new-keydate.component';

describe('NewKeydateComponent', () => {
  let component: NewKeydateComponent;
  let fixture: ComponentFixture<NewKeydateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewKeydateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewKeydateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
