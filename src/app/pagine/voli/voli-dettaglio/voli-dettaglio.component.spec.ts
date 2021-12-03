import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoliDettaglioComponent } from './voli-dettaglio.component';

describe('VoliDettaglioComponent', () => {
  let component: VoliDettaglioComponent;
  let fixture: ComponentFixture<VoliDettaglioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoliDettaglioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoliDettaglioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
