import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGeneralLedgerComponent } from './new-general-ledger.component';

describe('NewGeneralLedgerComponent', () => {
  let component: NewGeneralLedgerComponent;
  let fixture: ComponentFixture<NewGeneralLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGeneralLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGeneralLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
