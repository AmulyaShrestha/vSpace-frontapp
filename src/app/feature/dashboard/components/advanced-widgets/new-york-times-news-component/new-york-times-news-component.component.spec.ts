import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewYorkTimesNewsComponentComponent } from './new-york-times-news-component.component';

describe('NewYorkTimesNewsComponentComponent', () => {
  let component: NewYorkTimesNewsComponentComponent;
  let fixture: ComponentFixture<NewYorkTimesNewsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewYorkTimesNewsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewYorkTimesNewsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
