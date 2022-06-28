import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingInputComponent } from './drawing-input.component';

describe('DrawingInputComponent', () => {
  let component: DrawingInputComponent;
  let fixture: ComponentFixture<DrawingInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawingInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
