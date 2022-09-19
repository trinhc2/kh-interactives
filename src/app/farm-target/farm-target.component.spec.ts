import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmTargetComponent } from './farm-target.component';

describe('FarmTargetComponent', () => {
  let component: FarmTargetComponent;
  let fixture: ComponentFixture<FarmTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
