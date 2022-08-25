import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecomposeNumberLeiahComponent } from './decompose-number-leiah.component';

describe('DecomposeNumberLeiahComponent', () => {
  let component: DecomposeNumberLeiahComponent;
  let fixture: ComponentFixture<DecomposeNumberLeiahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecomposeNumberLeiahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecomposeNumberLeiahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
