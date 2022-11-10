import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapeZoomComponent } from './grape-zoom.component';

describe('GrapeZoomComponent', () => {
  let component: GrapeZoomComponent;
  let fixture: ComponentFixture<GrapeZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrapeZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrapeZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
