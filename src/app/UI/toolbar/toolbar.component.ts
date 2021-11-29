import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

import { AuthenticationService } from './../../auth/auth.service';
import { ScadenzePersoneService } from './../../servizi/scadenze-persona.service/scadenze-persona.service';
import { ScadenzaPersona } from './../../viewmodels/scadenzaPersona';
import { ScadenzaAereo } from 'src/app/viewmodels/scadenzaAereo';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public lingua: string;
  public nomeLingua: string;
  public notifiche = 0;
  public scadenzePersona: ScadenzaPersona[];
  public scadenzeAereiFlat: {
                              id: number,
                              aereo: number,
                              modello: string,
                              marche: string,
                              tipo: string,
                              data: string,
                              note: string
                            }[] = [];
  public linguaggi = environment.linguaggi;
  public nomeCognomeUtente: string;
  public loading = true;

  constructor(private translate: TranslateService,
              private auth: AuthenticationService,
              private scadenzePersonaAPI: ScadenzePersoneService) {
    this.lingua = this.translate.currentLang;
    this.nomeLingua = environment.linguaggi.find(lingua => lingua.codice == this.translate.currentLang).nome;
  }

  usaLingua(codiceLingua: string): void {
    this.translate.use(codiceLingua);
    this.lingua = codiceLingua;
    this.nomeLingua = environment.linguaggi.find(lingua => lingua.codice == codiceLingua).nome;
  }

  ngOnInit(): void {
    this.nomeCognomeUtente = this.auth.currentUserValue.nome + ' ' + this.auth.currentUserValue.cognome;
    this.scadenzePersonaAPI.get(this.auth.currentUserValue.persona).subscribe(data => {
      this.scadenzePersona = data.scadenzePersona;
      data.scadenzeAerei.forEach(scadenzaEsterna => {
        scadenzaEsterna.scadenzeAereo.forEach(scadenzaInterna => {
          this.scadenzeAereiFlat.push({
                                        id: scadenzaInterna.id,
                                        aereo: scadenzaEsterna.aereo,
                                        modello: scadenzaEsterna.modello,
                                        marche: scadenzaEsterna.marche,
                                        tipo: scadenzaInterna.tipo,
                                        data: scadenzaInterna.data,
                                        note: scadenzaInterna.note
                                      })          
        });
        
      });
      this.notifiche = this.scadenzePersona.length + this.scadenzeAereiFlat.length;
      this.loading = false;
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
