import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutenzioniDettaglioComponent } from './manutenzioni-dettaglio.component';

describe('ManutenzioniDettaglioComponent', () => {
  let component: ManutenzioniDettaglioComponent;
  let fixture: ComponentFixture<ManutenzioniDettaglioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManutenzioniDettaglioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutenzioniDettaglioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
