import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhFarmGrapeTwoComponent } from './kh-farm-grape-two.component';

describe('KhFarmGrapeTwoComponent', () => {
  let component: KhFarmGrapeTwoComponent;
  let fixture: ComponentFixture<KhFarmGrapeTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhFarmGrapeTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhFarmGrapeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
