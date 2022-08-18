import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhFarmGrapeComponent } from './kh-farm-grape.component';

describe('KhFarmGrapeComponent', () => {
  let component: KhFarmGrapeComponent;
  let fixture: ComponentFixture<KhFarmGrapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhFarmGrapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhFarmGrapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
