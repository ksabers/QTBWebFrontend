import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutenzioniAddComponent } from './manutenzioni-add.component';

describe('ManutenzioniAddComponent', () => {
  let component: ManutenzioniAddComponent;
  let fixture: ComponentFixture<ManutenzioniAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManutenzioniAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutenzioniAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
