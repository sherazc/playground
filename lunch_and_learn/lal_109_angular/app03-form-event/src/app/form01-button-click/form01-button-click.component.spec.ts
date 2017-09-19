import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form01ButtonClickComponent } from './form01-button-click.component';

describe('Form01ButtonClickComponent', () => {
  let component: Form01ButtonClickComponent;
  let fixture: ComponentFixture<Form01ButtonClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form01ButtonClickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form01ButtonClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
