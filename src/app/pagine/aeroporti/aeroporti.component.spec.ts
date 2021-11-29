import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeroportiComponent } from './aeroporti.component';

describe('AeroportiComponent', () => {
  let component: AeroportiComponent;
  let fixture: ComponentFixture<AeroportiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeroportiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeroportiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
