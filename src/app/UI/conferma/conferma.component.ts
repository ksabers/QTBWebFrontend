import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-conferma',
  templateUrl: './conferma.component.html',
  styleUrls: ['./conferma.component.scss']
})
export class ConfermaComponent implements OnInit {

  // i parametri devono essere chiavi delle stringhe di traduzione
  constructor(@Inject(MAT_DIALOG_DATA) public data: {titolo: string, testo: string, annulla: string, conferma: string}) { }

  ngOnInit(): void {
  }

}
