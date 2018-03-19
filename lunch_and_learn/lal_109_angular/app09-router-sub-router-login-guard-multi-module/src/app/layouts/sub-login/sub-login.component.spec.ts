import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubLoginComponent } from './sub-login.component';

describe('SubLoginComponent', () => {
  let component: SubLoginComponent;
  let fixture: ComponentFixture<SubLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
