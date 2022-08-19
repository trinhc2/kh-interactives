import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhZoomSpaceComponent } from './kh-zoom-space.component';

describe('KhZoomSpaceComponent', () => {
  let component: KhZoomSpaceComponent;
  let fixture: ComponentFixture<KhZoomSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhZoomSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhZoomSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
