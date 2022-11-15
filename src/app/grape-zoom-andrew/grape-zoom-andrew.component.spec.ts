import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapeZoomAndrewComponent } from './grape-zoom-andrew.component';

describe('GrapeZoomAndrewComponent', () => {
  let component: GrapeZoomAndrewComponent;
  let fixture: ComponentFixture<GrapeZoomAndrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrapeZoomAndrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrapeZoomAndrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
