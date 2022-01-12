import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneAddComponent } from './persone-add.component';

describe('PersoneAddComponent', () => {
  let component: PersoneAddComponent;
  let fixture: ComponentFixture<PersoneAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoneAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoneAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
