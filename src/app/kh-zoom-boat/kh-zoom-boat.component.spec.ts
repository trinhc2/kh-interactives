import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhZoomBoatComponent } from './kh-zoom-boat.component';

describe('KhZoomBoatComponent', () => {
  let component: KhZoomBoatComponent;
  let fixture: ComponentFixture<KhZoomBoatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhZoomBoatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhZoomBoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
