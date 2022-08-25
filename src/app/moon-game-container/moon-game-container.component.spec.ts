import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonGameContainerComponent } from './moon-game-container.component';

describe('MoonGameContainerComponent', () => {
  let component: MoonGameContainerComponent;
  let fixture: ComponentFixture<MoonGameContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoonGameContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoonGameContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
