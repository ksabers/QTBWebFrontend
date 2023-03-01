import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ManutenzioniAddForm } from './manutenzioni-add-form';
import { AereiService } from 'src/app/servizi/aerei/aerei.service';
import { TipiManutenzioniService } from 'src/app/servizi/manutenzioni/tipi-manutenzioni.service';
import { PersoneService } from 'src/app/servizi/persone/persone.service';
import { VoliService } from 'src/app/servizi/voli/voli.service';
import { Aereo } from 'src/app/viewmodels/aerei/aereo';
import { Persona } from 'src/app/viewmodels/persone/persona';
import { TipoManutenzione } from 'src/app/viewmodels/manutenzioni/tipo-manutenzione';
import { Volo } from 'src/app/viewmodels/voli/volo';

import { UtilsService } from 'src/app/servizi/utils/utils.service';
import { Manutenzione } from 'src/app/viewmodels/manutenzioni/manutenzione';
import { ManutenzioniService } from 'src/app/servizi/manutenzioni/manutenzioni.service';

import { ScadenzeAereiService } from 'src/app/servizi/scadenze/scadenze-aerei.service';
import { TipiScadenzeAereiService } from 'src/app/servizi/scadenze/tipi-scadenze-aerei.service';
import { ScadenzaAereo } from 'src/app/viewmodels/scadenze/scadenza-aereo';
import { TipoScadenzaAereo } from 'src/app/viewmodels/scadenze/tipo-scadenza-aereo';


@Component({
  selector: 'app-manutenzioni-add',
  templateUrl: './manutenzioni-add.component.html',
  styleUrls: ['./manutenzioni-add.component.scss']
})
export class ManutenzioniAddComponent implements OnInit {

  addManutenzioneForm: UntypedFormGroup;
  loading = true;
  submitting = false;
  submitted = false;
  listaAerei: Aereo[];
  listaTipiManutenzioni: TipoManutenzione[];
  listaPersone: Persona[];
  listaVoli: Volo[];
  listaVoliFiltrata: Volo[];
  listaTipiScadenzeAerei: TipoScadenzaAereo[];
  oreDiVoloMinime: number = 0;
  dataOdierna = new Date();

  constructor(private translate: TranslateService,
              private dateAdapter: DateAdapter<any>,
              private _snackBar: MatSnackBar,
              private router: Router,
              private fb: UntypedFormBuilder,
              private aereiAPI: AereiService,
              private manutenzioniAPI: ManutenzioniService,
              private tipiManutenzioneAPI: TipiManutenzioniService,
              private personeAPI: PersoneService,
              private voliAPI: VoliService,
              private scadenzeAereiAPI: ScadenzeAereiService,
              private tipiScadenzeAereiAPI: TipiScadenzeAereiService,
              private utils: UtilsService) { }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(res => {  // cambia la lingua del datepicker ascoltando l'evento di cambio del translate service
      this.dateAdapter.setLocale(this.translate.currentLang);
    });

    const form = new ManutenzioniAddForm();
    this.addManutenzioneForm = this.fb.group(form.campi);

    this.aereiAPI.getList().subscribe(data => {
      this.listaAerei = data;
      this.tipiManutenzioneAPI.getList().subscribe(data => {
        this.listaTipiManutenzioni = data;
        this.personeAPI.getList().subscribe(data => {
          this.listaPersone = data;
          this.voliAPI.getList().subscribe(data => {
            this.listaVoli = data;
            this.tipiScadenzeAereiAPI.getList().subscribe(data => {
              this.listaTipiScadenzeAerei = data;
              this.loading = false;
            })
          })
        })
      })
    })
  }

  filtraListaVoli(): void {
    this.listaVoliFiltrata = this.listaVoli.filter(volo => volo.idAereo == this.addManutenzioneForm.value.aereoSelect.id);
    this.aggiornaPresenzaScadenza();
    this.oreDiVoloMinime = Math.ceil((this.addManutenzioneForm.value.aereoSelect.minutiPregressi + this.addManutenzioneForm.value.aereoSelect.minutiVolo)/60);
    this.addManutenzioneForm.get('oreAssoluteInput').setValidators([Validators.required, Validators.min(this.oreDiVoloMinime + 1)]);
    this.addManutenzioneForm.get('oreAssoluteInput').updateValueAndValidity();
  }

  aggiornaPresenzaScadenza(): void {
    if (this.addManutenzioneForm.get('aereoSelect').value && this.addManutenzioneForm.get('tipoManutenzioneSelect').value) {
      this.addManutenzioneForm.get('presenzaScadenza').enable()
    } else {
      this.addManutenzioneForm.get('presenzaScadenza').disable()
    }
  }

  tornaPaginaManutenzioni(): void {
    this.router.navigate(['manutenzioni']);
  }

  switchPresenzaScadenza(): void {
    if (this.addManutenzioneForm.get('presenzaScadenza').value) {
      this.addManutenzioneForm.get('tipoScadenzaAereoSelect').enable()
    }
    else {
      this.addManutenzioneForm.get('tipoScadenzaAereoSelect').disable()
    }
  }

  switchEspressaInOreVolo(): void {
    if (this.addManutenzioneForm.get('espressaInOreVolo').value) {
      this.addManutenzioneForm.get('oreAssoluteRadio').enable();
      this.switchOreAssoluteRadio();  
    }
    else {
      this.addManutenzioneForm.get('oreAssoluteRadio').disable();
      this.addManutenzioneForm.get('oreAssoluteInput').disable();
      this.addManutenzioneForm.get('oreDeltaInput').disable();
    }
  }

  switchEspressaInData(): void {
    if (this.addManutenzioneForm.get('espressaInData').value) {
      this.addManutenzioneForm.get('dataAssolutaRadio').enable();
      this.switchDataAssolutaRadio();   
    }
    else {
      this.addManutenzioneForm.get('dataAssolutaRadio').disable();
      this.addManutenzioneForm.get('dataAssolutaInput').disable();
      this.addManutenzioneForm.get('giorniDeltaInput').disable();
    }
  }

  switchOreAssoluteRadio(): void {
    if (this.addManutenzioneForm.get('oreAssoluteRadio').value == 'assolute') {
      this.addManutenzioneForm.get('oreAssoluteInput').enable();
      this.addManutenzioneForm.get('oreDeltaInput').disable();
    } else {
      this.addManutenzioneForm.get('oreAssoluteInput').disable();
      this.addManutenzioneForm.get('oreDeltaInput').enable();
    }
  }

  switchDataAssolutaRadio(): void {
    if (this.addManutenzioneForm.get('dataAssolutaRadio').value == 'assolute') {
      this.addManutenzioneForm.get('dataAssolutaInput').enable();
      this.addManutenzioneForm.get('giorniDeltaInput').disable();
    } else {
      this.addManutenzioneForm.get('dataAssolutaInput').disable();
      this.addManutenzioneForm.get('giorniDeltaInput').enable();
    }
  }

  sommaGiorni(delta: number): Date {
    return this.utils.sommaGiorni(delta);
  }

  submitForm(): void {

    this.submitting = true;  // mostra lo spinner
    let nuovaManutenzione = new Manutenzione();

    nuovaManutenzione.descrizione = this.addManutenzioneForm.get('descrizioneInput').value || '';
    nuovaManutenzione.ordinaria = this.addManutenzioneForm.get('manutenzioneOrdinariaRadio').value;
    nuovaManutenzione.idTipoManutenzione = this.addManutenzioneForm.get('tipoManutenzioneSelect').value.id || null;
    nuovaManutenzione.data = new Date(this.addManutenzioneForm.get('dataManutenzioneInput').value) || null;
    nuovaManutenzione.aereo = this.addManutenzioneForm.get('aereoSelect').value.id;
    nuovaManutenzione.persona = this.addManutenzioneForm.get('personaSelect').value? this.addManutenzioneForm.get('personaSelect').value.id : null;
    nuovaManutenzione.volo = this.addManutenzioneForm.get('voloSelect').value? this.addManutenzioneForm.get('voloSelect').value.id : null;

    console.log(JSON.stringify(nuovaManutenzione));

    if (this.addManutenzioneForm.get('presenzaScadenza').value) {
      let nuovaScadenzaAereo = new ScadenzaAereo();
      nuovaScadenzaAereo.aereo = this.addManutenzioneForm.get('aereoSelect').value.id;
      nuovaScadenzaAereo.note = this.addManutenzioneForm.get('noteScadenzaInput').value || null;
      nuovaScadenzaAereo.idTipoScadenza = this.addManutenzioneForm.get('tipoScadenzaAereoSelect').value.id || null;

      if (this.addManutenzioneForm.get('espressaInOreVolo').value) {
        if (this.addManutenzioneForm.get('oreAssoluteRadio').value == 'assolute') {
          nuovaScadenzaAereo.minuti = this.addManutenzioneForm.get('oreAssoluteInput').value * 60;
        } else {
          nuovaScadenzaAereo.minuti = (this.addManutenzioneForm.get('oreDeltaInput').value + this.oreDiVoloMinime);
        } 
      }
      
      if (this.addManutenzioneForm.get('espressaInData').value) {
        if (this.addManutenzioneForm.get('dataAssolutaRadio').value == 'assolute') {
          nuovaScadenzaAereo.data =this.addManutenzioneForm.get('dataAssolutaInput').value;
        } else {
          nuovaScadenzaAereo.data = new Date(this.sommaGiorni(this.addManutenzioneForm.get('giorniDeltaInput').value));
        }        
      }

      console.log(JSON.stringify(nuovaScadenzaAereo));

/*       this.scadenzeAereiAPI.add(nuovaScadenzaAereo).subscribe({
        next: () => {

        },
        error: (error) => {

        }
      });*/
      
    }; 

/*     this.manutenzioniAPI.add(nuovaManutenzione).subscribe({
      next: () => {
        this.submitting = false;  // toglie lo spinner
        this.submitted = true; // disabilita il pulsante di submit

        // mostra il messaggio di OK e dopo due secondi torna alla lista manutenzioni
        let snackBarRef = this._snackBar.open(this.translate.instant('manutenzioni_add.manutenzione_inserita'), 
                                            this.translate.instant('manutenzioni_add.torna_alla_lista'), 
                                            { duration: 2000 });
        snackBarRef.afterDismissed().subscribe(() => {this.tornaPaginaManutenzioni()});
      },
      error: error => {
        this.submitting = false; // toglie lo spinner
        this.submitted = true; // disabilita il pulsante di submit

        // mostra il messaggio di errore e si blocca finché non viene chiuso, poi torna alla lista manutenzione
        let snackBarRef = this._snackBar.open(this.translate.instant('manutenzioni_add.errore_inserimento') + ': ' + error.message, 
                                              this.translate.instant('manutenzioni_add.chiudi'));
        snackBarRef.afterDismissed().subscribe(() => {this.tornaPaginaManutenzioni()});
      }
    }); */
  }
}
