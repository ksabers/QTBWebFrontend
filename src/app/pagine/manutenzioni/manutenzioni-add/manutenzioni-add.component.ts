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
  submitForm(): void {
  }
}
