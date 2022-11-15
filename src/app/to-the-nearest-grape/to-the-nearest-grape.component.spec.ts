import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToTheNearestGrapeComponent } from './to-the-nearest-grape.component';

describe('ToTheNearestGrapeComponent', () => {
  let component: ToTheNearestGrapeComponent;
  let fixture: ComponentFixture<ToTheNearestGrapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToTheNearestGrapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToTheNearestGrapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
