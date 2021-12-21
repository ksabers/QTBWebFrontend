import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

import { TipiAeroportiService } from './../../../servizi/tipi-aeroporti.service/tipi-aeroporti.service';
import { TipoAeroporto } from './../../../viewmodels/tipi-aeroporti/tipo-aeroporto';
import { AeroportiAddForm } from './aeroporti-add-form';

// Validatore custom che controlla che i campi delle coordinate siano o tutti pieni
// o tutti vuoti. Viene applicato a livello di form 
const ValidatoreCoordinate: ValidatorFn = (fg: FormGroup) => {
  if (!(fg.get('gradiLatInput').value) &&
      !(fg.get('minutiLatInput').value ) &&
      !(fg.get('secondiLatInput').value) &&
      !(fg.get('gradiLongInput').value) &&
      !(fg.get('minutiLongInput').value) &&
      !(fg.get('secondiLongInput').value)) {
    return null
  } else {
    if ((fg.get('gradiLatInput').value) &&
        (fg.get('minutiLatInput').value) &&
        (fg.get('secondiLatInput').value) &&
        (fg.get('gradiLongInput').value) &&
        (fg.get('minutiLongInput').value) &&
        (fg.get('secondiLongInput').value)) {
      return null
    } else {
      return { coordinate: true }
    }
  }
};

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
    const form = new AeroportiAddForm();
    this.addAeroportoForm = this.fb.group(form.campi, { // la lista dei campi del reactive form è in file separato
      validators: [ValidatoreCoordinate]     // questo validatore è a livello di form
    });  
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
