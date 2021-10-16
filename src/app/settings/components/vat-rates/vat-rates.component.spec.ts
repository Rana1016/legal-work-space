import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatRatesComponent } from './vat-rates.component';

describe('VatRatesComponent', () => {
  let component: VatRatesComponent;
  let fixture: ComponentFixture<VatRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VatRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VatRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
