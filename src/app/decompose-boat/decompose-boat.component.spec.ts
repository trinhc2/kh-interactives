import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecomposeBoatComponent } from './decompose-boat.component';

describe('DecomposeBoatComponent', () => {
  let component: DecomposeBoatComponent;
  let fixture: ComponentFixture<DecomposeBoatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecomposeBoatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecomposeBoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
