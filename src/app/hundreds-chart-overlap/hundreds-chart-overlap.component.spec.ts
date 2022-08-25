import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HundredsChartOverlapComponent } from './hundreds-chart-overlap.component';

describe('HundredsChartComponent', () => {
  let component: HundredsChartOverlapComponent;
  let fixture: ComponentFixture<HundredsChartOverlapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HundredsChartOverlapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HundredsChartOverlapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
