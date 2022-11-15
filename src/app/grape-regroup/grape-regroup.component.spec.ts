import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapeRegroupComponent } from './grape-regroup.component';

describe('GrapeRegroupComponent', () => {
  let component: GrapeRegroupComponent;
  let fixture: ComponentFixture<GrapeRegroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrapeRegroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrapeRegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
