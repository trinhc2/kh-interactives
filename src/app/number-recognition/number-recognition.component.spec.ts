import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberRecognitionComponent } from './number-recognition.component';

describe('NumberRecognitionComponent', () => {
  let component: NumberRecognitionComponent;
  let fixture: ComponentFixture<NumberRecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberRecognitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
