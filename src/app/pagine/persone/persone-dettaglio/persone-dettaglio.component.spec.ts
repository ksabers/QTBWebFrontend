import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneDettaglioComponent } from './persone-dettaglio.component';

describe('PersoneDettaglioComponent', () => {
  let component: PersoneDettaglioComponent;
  let fixture: ComponentFixture<PersoneDettaglioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoneDettaglioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoneDettaglioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
