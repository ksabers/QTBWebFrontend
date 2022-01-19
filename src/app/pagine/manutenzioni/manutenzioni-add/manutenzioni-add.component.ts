import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Aereo } from './../../../viewmodels/aerei/aereo';
import { ManutenzioniAddForm } from './manutenzioni-add-form';
import { AereiService } from './../../../servizi/aerei/aerei.service';
import { TipoManutenzione } from './../../../viewmodels/tipi-manutenzioni/tipo-manutenzione';
import { TipiManutenzioniService } from './../../../servizi/tipi-manutenzioni/tipi-manutenzioni.service';

@Component({
  selector: 'app-manutenzioni-add',
  templateUrl: './manutenzioni-add.component.html',
  styleUrls: ['./manutenzioni-add.component.scss']
})
export class ManutenzioniAddComponent implements OnInit {

  addManutenzioneForm: FormGroup;
  loading = true;
  listaAerei: Aereo[];
  listaTipiManutenzioni: TipoManutenzione[];

  constructor(private fb: FormBuilder,
              private aereiAPI: AereiService,
              private tipiManutenzioneAPI: TipiManutenzioniService) { }

  ngOnInit(): void {
    const form = new ManutenzioniAddForm();
    this.addManutenzioneForm = this.fb.group(form.campi);

    this.aereiAPI.getList().subscribe(data => {
      this.listaAerei = data;
      this.tipiManutenzioneAPI.getList().subscribe(data => {
        this.listaTipiManutenzioni = data;

        this.loading = false;
      })

    })
  }

  submitForm(): void {

  }

}
