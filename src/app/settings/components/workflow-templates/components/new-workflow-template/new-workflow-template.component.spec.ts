import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkflowTemplateComponent } from './new-workflow-template.component';

describe('NewWorkflowTemplateComponent', () => {
  let component: NewWorkflowTemplateComponent;
  let fixture: ComponentFixture<NewWorkflowTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWorkflowTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWorkflowTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
