import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutenzioniComponent } from './manutenzioni.component';

describe('ManutenzioniComponent', () => {
  let component: ManutenzioniComponent;
  let fixture: ComponentFixture<ManutenzioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManutenzioniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutenzioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
