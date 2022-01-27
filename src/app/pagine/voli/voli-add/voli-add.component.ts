import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthenticationService } from './../../../auth/auth.service';
import { AereiService } from '../../../servizi/aerei/aerei.service';
import { PersoneService } from '../../../servizi/persone/persone.service';
import { AeroportiService } from '../../../servizi/aeroporti/aeroporti.service';
import { VoliService } from '../../../servizi/voli/voli.service';
import { TipiVoliService } from 'src/app/servizi/tipi-voli/tipi-voli.service';
import { UtilsService } from '../../../servizi/utils/utils.service';
import { Aereo } from '../../../viewmodels/aerei/aereo';
import { Persona } from '../../../viewmodels/persone/persona';
import { Aeroporto } from '../../../viewmodels/aeroporti/aeroporto';
import { Volo } from './../../../viewmodels/voli/volo';
import { TipoVolo } from './../../../viewmodels/tipi-voli/tipo-volo';
import { environment } from './../../../../environments/environment';
import { VoliAddForm } from './voli-add-form';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


// Validatore custom che controlla che l'orametro finale sia successivo all'orametro iniziale
// Viene applicato a livello di form
const ValidatoreOrametro: ValidatorFn = (fg: FormGroup) => {
  const decollo = fg.get('oreDecolloInput').value * 60 + fg.get('minutiDecolloInput').value;
  const atterraggio = fg.get('oreAtterraggioInput').value * 60 + fg.get('minutiAtterraggioInput').value;
  return decollo !== null && atterraggio !== null && decollo < atterraggio
    ? null
    : { orametro: true };
};

// Validatore custom che controlla che il passeggero non sia uguale al pilota
// Viene applicato a livello di form
const ValidatorePasseggero: ValidatorFn = (fg: FormGroup)  => {
  const pilota = fg.get('pilotaSelect').value.id;
  const passeggero = fg.get('passeggeroSelect').value? fg.get('passeggeroSelect').value.id : null;
  return pilota != null &&  pilota != passeggero
    ? null
    : { passeggero: true };
};

@Component({
  selector: 'app-voli-add',
  templateUrl: './voli-add.component.html',
  styleUrls: ['./voli-add.component.scss']
})
export class VoliAddComponent implements OnInit {

  addVoloForm: FormGroup;

  listaAerei: Aereo[];
  listaPiloti: Persona[];
  listaPasseggeri: Persona[];
  listaAeroporti: Aeroporto[];
  listaTipiVoli: TipoVolo[];

  oraLocaleDecollo: string;
  oraLocaleAtterraggio: string;
  durataVolo: number;

  loading = true;
  submitting = false;
  submitted = false;

  rangeOreAtterraggio : number[];
  rangeMinutiAtterraggio = [...Array(60).keys()];
  get aereoSelezionato() {return this.addVoloForm.value.aereoSelect} ;
  get pesoCarburanteSX() {return (this.addVoloForm.get('carburanteInizialeSXInput').value * environment.densitaCarburante)||null};
  get pesoCarburanteDX() {return (this.addVoloForm.get('carburanteInizialeDXInput').value * environment.densitaCarburante)||null};
  get pesoOccupanti() {return this.addVoloForm.get('pesoOccupantiInput').value||null};
  get pesoBagaglio() {return this.addVoloForm.get('bagaglioInput').value ||null};

  constructor(private auth: AuthenticationService,
              private aereiAPI: AereiService,
              private personeAPI: PersoneService,
              private aeroportiAPI: AeroportiService,
              private tipiVoliAPI: TipiVoliService,
              private voliAPI: VoliService,
              private _snackBar: MatSnackBar,
              private fb: FormBuilder,
              private router: Router,
              private utils: UtilsService,
              private translate: TranslateService) { }

  ngOnInit(): void {

    const form = new VoliAddForm(this.utils);
    this.addVoloForm = this.fb.group(form.campi, {
      validators: [ValidatoreOrametro, ValidatorePasseggero] // questi sono i validatori a livello di form
    });

    this.tipiVoliAPI.getList().subscribe(data => {
      this.listaTipiVoli = data;
      this.aereiAPI.getList().subscribe(data => {
        this.listaAerei = data;
        this.personeAPI.getList().subscribe(data => {
          this.listaPiloti = data.filter(persona => persona.pilota == true);
          this.listaPasseggeri = data;
          this.aeroportiAPI.getList().subscribe(data => {
            this.listaAeroporti = data;

            // Se l'utente collegato è un pilota, lo seleziona
            let pilotaCorrente = this.listaPiloti.find(pilota => pilota.id === this.auth.currentUserValue.persona);
            if (pilotaCorrente) {
              this.addVoloForm.patchValue({
                pilotaSelect: pilotaCorrente
              });  
            }
            this.loading = false;  // toglie lo spinner
          });
        });      
    });
    });
  }

  /**
   * Evento sul cambiamento della select aerei. Riempie i campi dell'orametro iniziale con i valori
   * dell'ultimo volo, e la select di decollo con l'aeroporto dell'atterraggio più recente
   *
   * @memberof VoliAddComponent
   */
  cambiaAereo(): void {
    this.addVoloForm.patchValue({
      oreDecolloInput: this.addVoloForm.value.aereoSelect.voloPiuRecente.orametroOreFine,
      minutiDecolloInput: this.addVoloForm.value.aereoSelect.voloPiuRecente.orametroMinutiFine,
      oreAtterraggioInput: null,
      minutiAtterraggioInput: null,
      aeroportoDecolloSelect: this.listaAeroporti.find(aeroporto => aeroporto.id === this.addVoloForm.value.aereoSelect.voloPiuRecente.aeroportoFine)
    });
    this.addVoloForm.get('oreAtterraggioInput').setErrors(null);
    this.addVoloForm.get('minutiAtterraggioInput').setErrors(null);
    this.aggiornaDurata();
    let range = [];
    for (let index = this.addVoloForm.value.aereoSelect.voloPiuRecente.orametroOreFine; 
         index < this.addVoloForm.value.aereoSelect.voloPiuRecente.orametroOreFine + 4; 
         index++) {
      range = [...range, index];
    }
    this.rangeOreAtterraggio = range;
  }

  /**
   * Aggiorna il campo del peso occupanti a seconda della presenza del passeggero
   *
   * @memberof VoliAddComponent
   */
  cambiaPasseggero(): void {
    this.addVoloForm.patchValue({
      pesoOccupantiInput: this.addVoloForm.get('passeggeroSelect').value ? environment.pesoMedio * 2 : environment.pesoMedio
    });
  }
  
  /**
   * Calcola la durata del volo sottraendo l'orametro iniziale dal finale
   *
   * @memberof VoliAddComponent
   */
  aggiornaDurata(): void {
    if (this.addVoloForm.value.oreAtterraggioInput &&
        this.addVoloForm.value.minutiAtterraggioInput &&
        this.addVoloForm.value.oreDecolloInput &&
        this.addVoloForm.value.minutiDecolloInput) {

          this.durataVolo = ((this.addVoloForm.value.oreAtterraggioInput * 60 + this.addVoloForm.value.minutiAtterraggioInput) -
                      (this.addVoloForm.value.oreDecolloInput * 60 + this.addVoloForm.value.minutiDecolloInput));
         }
         else {
           this.durataVolo = 0;
         }

    // scrive l'ora di atterraggio locale come stringa in modo da poterla poi salvare nel db
    let dataIniziale = new Date(this.addVoloForm.value.dataOraAtterraggioInput);

    if (!isNaN(dataIniziale.getHours()) && !isNaN(dataIniziale.getMinutes())) {
      this.oraLocaleAtterraggio = this.utils.addZero(dataIniziale.getHours()) + ':' + this.utils.addZero(dataIniziale.getMinutes());
    } else {
      this.oraLocaleAtterraggio = '';
    }

    // calcola l'ora di decollo sottraendo la durata dall'ora di atterraggio
    dataIniziale.setMinutes(dataIniziale.getMinutes() - this.durataVolo);

    // scrive l'ora di decollo locale come stringa in modo da poterla poi salvare nel db
    // e inoltre la visualizza nel form
    if (!isNaN(dataIniziale.getHours()) && !isNaN(dataIniziale.getMinutes())) {
      this.oraLocaleDecollo = this.utils.addZero(dataIniziale.getHours()) + ':' + this.utils.addZero(dataIniziale.getMinutes());
    } else {
      this.oraLocaleDecollo = '';
    }
  }

  tornaPaginaVoli(): void {
    this.router.navigate(['voli']);
  }

  submitForm(): void {
    this.submitting = true;  // mostra lo spinner
    let nuovoVolo = new Volo();

    nuovoVolo.descrizione =  this.addVoloForm.get('descrizioneInput').value || '';
    nuovoVolo.idTipoVolo = this.addVoloForm.get('tipoVoloSelect').value ? this.addVoloForm.get('tipoVoloSelect').value.id : this.listaTipiVoli[0].id;
    nuovoVolo.idAereo = this.addVoloForm.get('aereoSelect').value.id || null;
    nuovoVolo.idPilota = this.addVoloForm.get('pilotaSelect').value.id || null;
    nuovoVolo.idPasseggero = this.addVoloForm.get('passeggeroSelect').value ? this.addVoloForm.get('passeggeroSelect').value.id : null;
    nuovoVolo.oraLocaleDecollo = this.oraLocaleDecollo;
    nuovoVolo.orametroOreInizio =  this.addVoloForm.get('oreDecolloInput').value;
    nuovoVolo.orametroMinutiInizio = this.addVoloForm.get('minutiDecolloInput').value;
    nuovoVolo.oraFine = new Date(this.addVoloForm.get('dataOraAtterraggioInput').value),
    nuovoVolo.oraLocaleAtterraggio = this.oraLocaleAtterraggio;
    nuovoVolo.orametroOreFine = this.addVoloForm.get('oreAtterraggioInput').value;
    nuovoVolo.orametroMinutiFine = this.addVoloForm.get('minutiAtterraggioInput').value;
    nuovoVolo.carburanteInizialeSx = this.addVoloForm.get('carburanteInizialeSXInput').value || null;
    nuovoVolo.carburanteInizialeDx = this.addVoloForm.get('carburanteInizialeDXInput').value || null;
    nuovoVolo.carburanteAggiuntoSx = this.addVoloForm.get('carburanteAggiuntoSXInput').value || null;
    nuovoVolo.carburanteAggiuntoDx = this.addVoloForm.get('carburanteAggiuntoDXInput').value || null;
    nuovoVolo.olio = this.addVoloForm.get('olioInput').value || null;
    nuovoVolo.pesoOccupanti = this.addVoloForm.get('pesoOccupantiInput').value || null;
    nuovoVolo.bagaglio = this.addVoloForm.get('bagaglioInput').value || null;
    nuovoVolo.idAeroportoInizio = this.addVoloForm.get('aeroportoDecolloSelect').value.id || null;
    nuovoVolo.idAeroportoFine = this.addVoloForm.get('aeroportoAtterraggioSelect').value.id || null;

    this.voliAPI.add(nuovoVolo).subscribe({
      next: () => {
        this.submitting = false;  // toglie lo spinner
        this.submitted = true; // disabilita il pulsante di submit

        // mostra il messaggio di OK e dopo due secondi torna alla lista voli
        let snackBarRef = this._snackBar.open(this.translate.instant('voli_add.volo_inserito'), 
                                            this.translate.instant('voli_add.torna_alla_lista'), 
                                            { duration: 2000 });
        snackBarRef.afterDismissed().subscribe(() => {this.tornaPaginaVoli();});
      },
      error: error => {
        this.submitting = false; // toglie lo spinner
        this.submitted = true; // disabilita il pulsante di submit

        // mostra il messaggio di errore e si blocca finché non viene chiuso, poi torna alla lista voli
        let snackBarRef = this._snackBar.open(this.translate.instant('voli_add.errore_inserimento') + ': ' + error.message, 
                                              this.translate.instant('voli_add.chiudi'));
        snackBarRef.afterDismissed().subscribe(() => {this.tornaPaginaVoli();});
      }
    });
  }
}
