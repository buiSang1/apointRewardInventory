import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputTextFilterComponent } from './custom-input-text-filter.component';

describe('CustomInputTextFilterComponent', () => {
  let component: CustomInputTextFilterComponent;
  let fixture: ComponentFixture<CustomInputTextFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomInputTextFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomInputTextFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
