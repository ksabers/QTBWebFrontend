import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeroportiAddComponent } from './aeroporti-add.component';

describe('AeroportiAddComponent', () => {
  let component: AeroportiAddComponent;
  let fixture: ComponentFixture<AeroportiAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeroportiAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeroportiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
