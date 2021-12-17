import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAmlListComponent } from './new-aml-list.component';

describe('NewAmlListComponent', () => {
  let component: NewAmlListComponent;
  let fixture: ComponentFixture<NewAmlListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAmlListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAmlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
