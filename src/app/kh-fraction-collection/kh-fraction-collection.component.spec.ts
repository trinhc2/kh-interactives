import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhFractionCollectionComponent } from './kh-fraction-collection.component';

describe('KhFractionCollectionComponent', () => {
  let component: KhFractionCollectionComponent;
  let fixture: ComponentFixture<KhFractionCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhFractionCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhFractionCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
