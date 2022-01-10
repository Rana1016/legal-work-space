import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeydatesComponent } from './keydates.component';

describe('KeydatesComponent', () => {
  let component: KeydatesComponent;
  let fixture: ComponentFixture<KeydatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeydatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeydatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
