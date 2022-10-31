import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmBoatComponent } from './farm-boat.component';

describe('FarmBoatComponent', () => {
  let component: FarmBoatComponent;
  let fixture: ComponentFixture<FarmBoatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmBoatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmBoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
