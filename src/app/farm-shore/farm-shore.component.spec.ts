import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmShoreComponent } from './farm-shore.component';

describe('FarmShoreComponent', () => {
  let component: FarmShoreComponent;
  let fixture: ComponentFixture<FarmShoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmShoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmShoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
