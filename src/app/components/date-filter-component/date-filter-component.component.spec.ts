import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFilterComponent } from './date-filter-component.component';

describe('DateFilterComponentComponent', () => {
  let component: DateFilterComponent;
  let fixture: ComponentFixture<DateFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
