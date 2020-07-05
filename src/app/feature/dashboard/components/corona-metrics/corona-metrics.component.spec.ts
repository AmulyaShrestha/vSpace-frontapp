import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaMetricsComponent } from './corona-metrics.component';

describe('CoronaMetricsComponent', () => {
  let component: CoronaMetricsComponent;
  let fixture: ComponentFixture<CoronaMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronaMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
