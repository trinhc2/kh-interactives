import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhFarmFlowerComponent } from './kh-farm-flower.component';

describe('KhFarmFlowerComponent', () => {
  let component: KhFarmFlowerComponent;
  let fixture: ComponentFixture<KhFarmFlowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhFarmFlowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhFarmFlowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
