import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTransactionComponent } from './general-transaction.component';

describe('GeneralTransactionComponent', () => {
  let component: GeneralTransactionComponent;
  let fixture: ComponentFixture<GeneralTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
