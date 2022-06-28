import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhSliderInputComponent } from './kh-slider-input.component';

describe('KhSliderInputComponent', () => {
  let component: KhSliderInputComponent;
  let fixture: ComponentFixture<KhSliderInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhSliderInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhSliderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
