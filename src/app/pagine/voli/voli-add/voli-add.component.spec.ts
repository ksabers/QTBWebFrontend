import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoliAddComponent } from './voli-add.component';

describe('VoliAddComponent', () => {
  let component: VoliAddComponent;
  let fixture: ComponentFixture<VoliAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoliAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoliAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
