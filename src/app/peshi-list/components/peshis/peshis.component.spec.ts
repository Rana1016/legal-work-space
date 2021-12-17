import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeshisComponent } from './peshis.component';

describe('PeshisComponent', () => {
  let component: PeshisComponent;
  let fixture: ComponentFixture<PeshisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeshisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeshisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
