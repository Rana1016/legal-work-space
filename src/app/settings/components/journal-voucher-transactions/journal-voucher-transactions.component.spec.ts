import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalVoucherTransactionsComponent } from './journal-voucher-transactions.component';

describe('JournalVoucherTransactionsComponent', () => {
  let component: JournalVoucherTransactionsComponent;
  let fixture: ComponentFixture<JournalVoucherTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalVoucherTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalVoucherTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
