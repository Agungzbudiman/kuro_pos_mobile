import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTransaksiPage } from './detail-transaksi.page';

describe('DetailTransaksiPage', () => {
  let component: DetailTransaksiPage;
  let fixture: ComponentFixture<DetailTransaksiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTransaksiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTransaksiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
