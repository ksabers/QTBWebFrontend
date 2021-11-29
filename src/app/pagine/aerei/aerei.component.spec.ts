import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AereiComponent } from './aerei.component';

describe('AereiComponent', () => {
  let component: AereiComponent;
  let fixture: ComponentFixture<AereiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AereiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AereiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
