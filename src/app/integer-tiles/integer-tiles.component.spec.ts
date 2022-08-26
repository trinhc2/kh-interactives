import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegerTilesComponent } from './integer-tiles.component';

describe('IntegerTilesComponent', () => {
  let component: IntegerTilesComponent;
  let fixture: ComponentFixture<IntegerTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegerTilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegerTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
