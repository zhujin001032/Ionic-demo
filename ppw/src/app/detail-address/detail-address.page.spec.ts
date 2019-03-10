import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAddressPage } from './detail-address.page';

describe('DetailAddressPage', () => {
  let component: DetailAddressPage;
  let fixture: ComponentFixture<DetailAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
