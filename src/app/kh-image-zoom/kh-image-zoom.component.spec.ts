import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhImageZoomComponent } from './kh-image-zoom.component';

describe('KhImageZoomComponent', () => {
  let component: KhImageZoomComponent;
  let fixture: ComponentFixture<KhImageZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhImageZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhImageZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
