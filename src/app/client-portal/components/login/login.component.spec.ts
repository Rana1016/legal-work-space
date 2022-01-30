import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: ClientLoginComponent;
  let fixture: ComponentFixture<ClientLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
