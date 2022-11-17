import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentingGrapesComponent } from './representing-grapes.component';

describe('RepresentingGrapesComponent', () => {
  let component: RepresentingGrapesComponent;
  let fixture: ComponentFixture<RepresentingGrapesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentingGrapesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentingGrapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
