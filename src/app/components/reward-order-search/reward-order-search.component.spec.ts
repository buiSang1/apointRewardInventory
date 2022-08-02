import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardOrderSearchComponent } from './reward-order-search.component';

describe('RewardOrderSearchComponent', () => {
  let component: RewardOrderSearchComponent;
  let fixture: ComponentFixture<RewardOrderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardOrderSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardOrderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
