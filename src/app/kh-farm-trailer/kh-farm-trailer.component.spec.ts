import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhFarmTrailerComponent } from './kh-farm-trailer.component';

describe('KhFarmTrailerComponent', () => {
  let component: KhFarmTrailerComponent;
  let fixture: ComponentFixture<KhFarmTrailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhFarmTrailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhFarmTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
