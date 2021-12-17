import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TipiAeroportiService } from './../../../servizi/tipi-aeroporti.service/tipi-aeroporti.service';
import { TipoAeroporto } from './../../../viewmodels/tipi-aeroporti/tipo-aeroporto';
import { campiForm } from './campi-form';

@Component({
  selector: 'app-aeroporti-add',
  templateUrl: './aeroporti-add.component.html',
  styleUrls: ['./aeroporti-add.component.scss']
})
export class AeroportiAddComponent implements OnInit {

  addAeroportoForm: FormGroup;
  listaTipiAeroporti: TipoAeroporto[];

  loading = true;
  submitting = false;
  submitted = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private tipiAeroportiAPI: TipiAeroportiService) { }

  ngOnInit(): void {
    this.addAeroportoForm = this.fb.group(campiForm);  // la lista dei campi del reactive form è in file separato
    this.tipiAeroportiAPI.getList().subscribe(data => {
      this.listaTipiAeroporti = data;
      this.addAeroportoForm.controls.tipoAeroportoSelect.setValue(this.listaTipiAeroporti[0]); // valore di default della select
      this.loading = false;  // toglie lo spinner
    })
  }

  tornaPaginaAeroporti(): void {
    this.router.navigate(['aeroporti']);
  }


  submitForm(): void {

  }
}
