import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  titoloApplicazione = environment.titoloApplicazione;

  constructor() { }

  ngOnInit(): void {
  }

}
