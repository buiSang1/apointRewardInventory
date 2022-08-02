import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputSelectFilterComponent } from './custom-input-select-filter.component';

describe('CustomInputSelectFilterComponent', () => {
  let component: CustomInputSelectFilterComponent;
  let fixture: ComponentFixture<CustomInputSelectFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomInputSelectFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomInputSelectFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
