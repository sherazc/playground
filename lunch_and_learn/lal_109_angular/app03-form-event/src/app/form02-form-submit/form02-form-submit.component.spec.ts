import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form02FormSubmitComponent } from './form02-form-submit.component';

describe('Form02FormSubmitComponent', () => {
  let component: Form02FormSubmitComponent;
  let fixture: ComponentFixture<Form02FormSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form02FormSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form02FormSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
