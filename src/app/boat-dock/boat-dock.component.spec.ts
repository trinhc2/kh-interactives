import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatDockComponent } from './boat-dock.component';

describe('BoatDockComponent', () => {
  let component: BoatDockComponent;
  let fixture: ComponentFixture<BoatDockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatDockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatDockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
