import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVatRateComponent } from './new-vat-rate.component';

describe('NewVatRateComponent', () => {
  let component: NewVatRateComponent;
  let fixture: ComponentFixture<NewVatRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVatRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVatRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
