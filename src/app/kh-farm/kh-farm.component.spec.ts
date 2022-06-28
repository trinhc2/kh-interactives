import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhFarmComponent } from './kh-farm.component';

describe('KhFarmComponent', () => {
  let component: KhFarmComponent;
  let fixture: ComponentFixture<KhFarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhFarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
