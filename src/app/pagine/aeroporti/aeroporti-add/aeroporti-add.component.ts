import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TipiAeroportiService } from '../../../servizi/tipi-aeroporti/tipi-aeroporti.service';
import { TipoAeroporto } from './../../../viewmodels/tipi-aeroporti/tipo-aeroporto';
import { AeroportiAddForm } from './aeroporti-add-form';
import { Aeroporto } from './../../../viewmodels/aeroporto';
import { UtilsService } from '../../../servizi/utils/utils.service';
import { AeroportiService } from '../../../servizi/aeroporti/aeroporti.service';

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
              private tipiAeroportiAPI: TipiAeroportiService,
              private aeroportiAPI: AeroportiService,
              private _snackBar: MatSnackBar,
              private utils: UtilsService,
              private translate: TranslateService) { }

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
    this.submitting = true;  // mostra lo spinner
    let nuovoAeroporto = new Aeroporto();

    nuovoAeroporto.nome = this.addAeroportoForm.get('nomeInput').value || null;
    nuovoAeroporto.denominazione = this.addAeroportoForm.get('denominazioneInput').value || null;
    nuovoAeroporto.identificativo = this.addAeroportoForm.get('identificativoInput').value || null;
    nuovoAeroporto.icao = this.addAeroportoForm.get('ICAOInput').value || null;
    nuovoAeroporto.iata = this.addAeroportoForm.get('IATAInput').value || null;
    nuovoAeroporto.qnh = this.addAeroportoForm.get('QNHInput').value || null;
    nuovoAeroporto.qfu = this.addAeroportoForm.get('QFUInput').value || null;
    nuovoAeroporto.radio = this.addAeroportoForm.get('radioInput').value || null;
    nuovoAeroporto.idTipoAeroporto = this.addAeroportoForm.get('tipoAeroportoSelect').value.id || null;
    nuovoAeroporto.coordinate = this.utils.coordinate(this.addAeroportoForm.get('gradiLatInput').value,
                                                      this.addAeroportoForm.get('minutiLatInput').value,
                                                      this.addAeroportoForm.get('secondiLatInput').value,
                                                      this.addAeroportoForm.get('nordSudSelect').value,
                                                      this.addAeroportoForm.get('gradiLongInput').value,
                                                      this.addAeroportoForm.get('minutiLongInput').value,
                                                      this.addAeroportoForm.get('secondiLongInput').value,
                                                      this.addAeroportoForm.get('estOvestSelect').value) || null;
    nuovoAeroporto.lunghezza = this.addAeroportoForm.get('lunghezzaPistaInput').value || null;
    nuovoAeroporto.asfalto = this.addAeroportoForm.get('tipoPistaSelect').value == 'true';
    nuovoAeroporto.indirizzo = this.addAeroportoForm.get('indirizzoInput').value || null;
    nuovoAeroporto.telefono = this.addAeroportoForm.get('telefonoInput').value || null;
    nuovoAeroporto.email = this.addAeroportoForm.get('emailInput').value || null;
    nuovoAeroporto.web = this.addAeroportoForm.get('webInput').value || null;
    nuovoAeroporto.note = this.addAeroportoForm.get('noteInput').value || null;

    console.log(JSON.stringify(nuovoAeroporto));

      this.aeroportiAPI.add(nuovoAeroporto).subscribe({
      next: () => {
        this.submitting = false;  // toglie lo spinner
        this.submitted = true; // disabilita il pulsante di submit

        // mostra il messaggio di OK e dopo due secondi torna alla lista aeroporti
        let snackBarRef = this._snackBar.open(this.translate.instant('aeroporti_add.aeroporto_inserito'), 
                                            this.translate.instant('aeroporti_add.torna_alla_lista'), 
                                            { duration: 2000 });
        snackBarRef.afterDismissed().subscribe(() => {this.tornaPaginaAeroporti()});
      },
      error: error => {
        this.submitting = false; // toglie lo spinner
        this.submitted = true; // disabilita il pulsante di submit

        // mostra il messaggio di errore e si blocca finché non viene chiuso, poi torna alla lista aeroporti
        let snackBarRef = this._snackBar.open(this.translate.instant('aeroporti_add.errore_inserimento') + ': ' + error.message, 
                                              this.translate.instant('aeroporti_add.chiudi'));
        snackBarRef.afterDismissed().subscribe(() => {this.tornaPaginaAeroporti()});
      }
    }); 
  }
}
