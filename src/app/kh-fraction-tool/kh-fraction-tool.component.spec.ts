import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhFractionToolComponent } from './kh-fraction-tool.component';

describe('KhFractionToolComponent', () => {
  let component: KhFractionToolComponent;
  let fixture: ComponentFixture<KhFractionToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhFractionToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhFractionToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
