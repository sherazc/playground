import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemSummaryComponent } from './view-item-summary.component';

describe('ViewItemSummaryComponent', () => {
  let component: ViewItemSummaryComponent;
  let fixture: ComponentFixture<ViewItemSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewItemSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItemSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
