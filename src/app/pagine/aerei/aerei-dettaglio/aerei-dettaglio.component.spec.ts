import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AereiDettaglioComponent } from './aerei-dettaglio.component';

describe('AereiDettaglioComponent', () => {
  let component: AereiDettaglioComponent;
  let fixture: ComponentFixture<AereiDettaglioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AereiDettaglioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AereiDettaglioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
