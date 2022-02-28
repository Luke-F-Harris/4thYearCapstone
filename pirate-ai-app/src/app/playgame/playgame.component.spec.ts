import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygameComponent } from './playgame.component';

describe('PlaygameComponent', () => {
  let component: PlaygameComponent;
  let fixture: ComponentFixture<PlaygameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaygameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
