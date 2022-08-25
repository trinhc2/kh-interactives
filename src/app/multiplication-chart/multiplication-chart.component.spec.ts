import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplicationChartComponent } from './multiplication-chart.component';

describe('MultiplicationChartComponent', () => {
  let component: MultiplicationChartComponent;
  let fixture: ComponentFixture<MultiplicationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplicationChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplicationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
