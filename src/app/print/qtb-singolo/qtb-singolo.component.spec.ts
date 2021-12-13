import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtbSingoloComponent } from './qtb-singolo.component';

describe('QtbSingoloComponent', () => {
  let component: QtbSingoloComponent;
  let fixture: ComponentFixture<QtbSingoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtbSingoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QtbSingoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
