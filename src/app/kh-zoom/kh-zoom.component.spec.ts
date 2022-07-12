import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhZoomComponent } from './kh-zoom.component';

describe('KhZoomComponent', () => {
  let component: KhZoomComponent;
  let fixture: ComponentFixture<KhZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
