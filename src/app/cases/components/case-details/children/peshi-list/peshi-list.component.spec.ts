import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeshiListComponent } from './peshi-list.component';

describe('PeshiListComponent', () => {
  let component: PeshiListComponent;
  let fixture: ComponentFixture<PeshiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeshiListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeshiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
