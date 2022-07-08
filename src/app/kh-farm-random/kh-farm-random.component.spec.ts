import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhFarmRandomComponent } from './kh-farm-random.component';

describe('KhFarmRandomComponent', () => {
  let component: KhFarmRandomComponent;
  let fixture: ComponentFixture<KhFarmRandomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhFarmRandomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhFarmRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
