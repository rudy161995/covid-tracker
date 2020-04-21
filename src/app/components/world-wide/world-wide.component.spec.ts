import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldWideComponent } from './world-wide.component';

describe('WorldWideComponent', () => {
  let component: WorldWideComponent;
  let fixture: ComponentFixture<WorldWideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldWideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldWideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
