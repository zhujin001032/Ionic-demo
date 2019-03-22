import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAddressPage } from './choose-address.page';

describe('ChooseAddressPage', () => {
  let component: ChooseAddressPage;
  let fixture: ComponentFixture<ChooseAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseAddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
