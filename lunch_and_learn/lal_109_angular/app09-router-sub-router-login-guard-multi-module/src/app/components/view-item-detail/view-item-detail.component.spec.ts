import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemDetailComponent } from './view-item-detail.component';

describe('ViewItemDetailComponent', () => {
  let component: ViewItemDetailComponent;
  let fixture: ComponentFixture<ViewItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
