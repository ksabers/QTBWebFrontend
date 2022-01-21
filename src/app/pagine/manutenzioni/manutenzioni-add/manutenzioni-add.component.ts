import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';

import { ManutenzioniAddForm } from './manutenzioni-add-form';
import { AereiService } from './../../../servizi/aerei/aerei.service';
import { TipiManutenzioniService } from './../../../servizi/tipi-manutenzioni/tipi-manutenzioni.service';
import { PersoneService } from './../../../servizi/persone/persone.service';
import { VoliService } from './../../../servizi/voli/voli.service';
import { Aereo } from './../../../viewmodels/aerei/aereo';
import { Persona } from './../../../viewmodels/persone/persona';
import { TipoManutenzione } from './../../../viewmodels/tipi-manutenzioni/tipo-manutenzione';
import { Volo } from './../../../viewmodels/voli/volo';
import { TipoScadenzaAereo } from './../../../viewmodels/tipi-scadenze-aerei/tipo-scadenza-aereo';
import { TipiScadenzeAereiService } from './../../../servizi/tipi-scadenze-aerei/tipi-scadenze-aerei.service';
import { UtilsService } from './../../../servizi/utils/utils.service';



@Component({
  selector: 'app-manutenzioni-add',
  templateUrl: './manutenzioni-add.component.html',
  styleUrls: ['./manutenzioni-add.component.scss']
})
export class ManutenzioniAddComponent implements OnInit {

  addManutenzioneForm: FormGroup;
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
              private router: Router,
              private fb: FormBuilder,
              private aereiAPI: AereiService,
              private tipiManutenzioneAPI: TipiManutenzioniService,
              private personeAPI: PersoneService,
              private voliAPI: VoliService,
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
  }
}
