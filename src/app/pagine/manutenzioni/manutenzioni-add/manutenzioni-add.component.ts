import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';


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
  favoriteSeason: string;

  constructor(private translate: TranslateService,
              private dateAdapter: DateAdapter<any>,
              private router: Router,
              private fb: FormBuilder,
              private aereiAPI: AereiService,
              private tipiManutenzioneAPI: TipiManutenzioniService,
              private personeAPI: PersoneService,
              private voliAPI: VoliService) { }

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
            this.loading = false;
          })
        })
      })
    })
  }

  filtraListaVoli(): void {
    this.listaVoliFiltrata = this.listaVoli.filter(volo => volo.idAereo == this.addManutenzioneForm.value.aereoSelect.id)
  }

  tornaPaginaManutenzioni(): void {
    this.router.navigate(['manutenzioni']);
  }

  switchEspressaInOreVolo(){
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

  switchEspressaInData(){
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

  switchOreAssoluteRadio() {
    if (this.addManutenzioneForm.get('oreAssoluteRadio').value == 'assolute') {
      this.addManutenzioneForm.get('oreAssoluteInput').enable();
      this.addManutenzioneForm.get('oreDeltaInput').disable();
    } else {
      this.addManutenzioneForm.get('oreAssoluteInput').disable();
      this.addManutenzioneForm.get('oreDeltaInput').enable();
    }
  }

  switchDataAssolutaRadio() {
    if (this.addManutenzioneForm.get('dataAssolutaRadio').value == 'assolute') {
      this.addManutenzioneForm.get('dataAssolutaInput').enable();
      this.addManutenzioneForm.get('giorniDeltaInput').disable();
    } else {
      this.addManutenzioneForm.get('dataAssolutaInput').disable();
      this.addManutenzioneForm.get('giorniDeltaInput').enable();
    }
  }

  submitForm(): void {
  }
}
