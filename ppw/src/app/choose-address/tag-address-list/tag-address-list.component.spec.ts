import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagAddressListPage } from './tag-address-list.page';

describe('TagAddressListPage', () => {
  let component: TagAddressListPage;
  let fixture: ComponentFixture<TagAddressListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagAddressListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagAddressListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
