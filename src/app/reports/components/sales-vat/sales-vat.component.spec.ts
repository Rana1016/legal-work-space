import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesVatComponent } from './sales-vat.component';

describe('SalesVatComponent', () => {
  let component: SalesVatComponent;
  let fixture: ComponentFixture<SalesVatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesVatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesVatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
