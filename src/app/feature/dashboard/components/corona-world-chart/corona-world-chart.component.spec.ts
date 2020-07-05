import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaWorldChartComponent } from './corona-world-chart.component';

describe('CoronaWorldChartComponent', () => {
  let component: CoronaWorldChartComponent;
  let fixture: ComponentFixture<CoronaWorldChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronaWorldChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaWorldChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
