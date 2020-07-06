import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTabsPage } from './history-tabs.page';

describe('HistoryTabsPage', () => {
  let component: HistoryTabsPage;
  let fixture: ComponentFixture<HistoryTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryTabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
