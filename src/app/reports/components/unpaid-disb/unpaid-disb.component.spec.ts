import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidDisbComponent } from './unpaid-disb.component';

describe('UnpaidDisbComponent', () => {
  let component: UnpaidDisbComponent;
  let fixture: ComponentFixture<UnpaidDisbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpaidDisbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidDisbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
