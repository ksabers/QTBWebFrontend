import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AereiAddComponent } from './aerei-add.component';

describe('AereiAddComponent', () => {
  let component: AereiAddComponent;
  let fixture: ComponentFixture<AereiAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AereiAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AereiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
