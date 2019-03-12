import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAddressPage } from './search-address.page';

describe('SearchAddressPage', () => {
  let component: SearchAddressPage;
  let fixture: ComponentFixture<SearchAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
