import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBarangPage } from './list-barang.page';

describe('ListBarangPage', () => {
  let component: ListBarangPage;
  let fixture: ComponentFixture<ListBarangPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBarangPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBarangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
