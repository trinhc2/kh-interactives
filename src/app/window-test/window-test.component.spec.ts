import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowTestComponent } from './window-test.component';

describe('WindowTestComponent', () => {
  let component: WindowTestComponent;
  let fixture: ComponentFixture<WindowTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
