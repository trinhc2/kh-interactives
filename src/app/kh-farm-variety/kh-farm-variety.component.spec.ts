import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhFarmVarietyComponent } from './kh-farm-variety.component';

describe('KhFarmVarietyComponent', () => {
  let component: KhFarmVarietyComponent;
  let fixture: ComponentFixture<KhFarmVarietyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhFarmVarietyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhFarmVarietyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
