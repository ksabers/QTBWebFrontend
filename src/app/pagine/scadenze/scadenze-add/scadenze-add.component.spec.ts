import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScadenzeAddComponent } from './scadenze-add.component';

describe('ScadenzeAddComponent', () => {
  let component: ScadenzeAddComponent;
  let fixture: ComponentFixture<ScadenzeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScadenzeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScadenzeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
