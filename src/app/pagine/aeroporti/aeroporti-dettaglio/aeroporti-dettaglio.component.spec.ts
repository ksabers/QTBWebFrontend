import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeroportiDettaglioComponent } from './aeroporti-dettaglio.component';

describe('AeroportiDettaglioComponent', () => {
  let component: AeroportiDettaglioComponent;
  let fixture: ComponentFixture<AeroportiDettaglioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeroportiDettaglioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeroportiDettaglioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
