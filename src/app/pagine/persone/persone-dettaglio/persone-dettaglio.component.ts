import { Component, OnInit, Inject} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';
import { Persona } from 'src/app/viewmodels/persone/persona';

@Component({
  selector: 'app-persone-dettaglio',
  templateUrl: './persone-dettaglio.component.html',
  styleUrls: ['./persone-dettaglio.component.scss']
})
export class PersoneDettaglioComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public persona: Persona) { }

  ngOnInit(): void {
  }

}
