import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TipiAeroportiService } from 'src/app/servizi/tipi-aeroporti.service/tipi-aeroporti.service';
import { TipoAeroporto } from 'src/app/viewmodels/tipi-aeroporti/tipo-aeroporto';
import { validateBasis } from '@angular/flex-layout';

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

    // Campi del reactive form
    this.addAeroportoForm = this.fb.group({
      nomeInput: ['',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      denominazioneInput: ['',
        [
          Validators.maxLength(4000)
        ]
      ],
      identificativoInput: ['',
        [
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern('[A-Z]{2}[0-9]{2}')
        ]
      ],
      ICAOInput: ['',
        [
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern('[A-Z]{4}')
        ]
      ],
      IATAInput: ['',
        [
          Validators.maxLength(3)
        ]
      ],
      QNHInput: ['',
        [
          Validators.min(0),
          Validators.max(15000)
        ]
      ],
      QFUInput: ['',
        [
          Validators.pattern('[0-9]{2}/[0-9]{2}'),
          Validators.minLength(5),
          Validators.maxLength(5)
        ]
      ],
      radioInput: ['',
        [
          Validators.maxLength(50)
        ]
      ],
      tipoAeroportoSelect: ['',
        [
        ]
      ],
      gradiLatInput: ['',
        [
          Validators.min(0),
          Validators.max(359),
          Validators.pattern('[0-9]{1,3}')
        ]
      ],
      minutiLatInput: ['',
        [
          Validators.min(0),
          Validators.max(59),
          Validators.pattern('[0-9]{1,2}')
        ]
      ],
      secondiLatInput: ['',
        [
          Validators.min(0),
          Validators.max(59),
          Validators.pattern('[0-9]{1,2}|[0-9]{1,2}.[0-9]{1,4}')
        ]
      ],
      nordSudSelect: ['N',
        [
        ]
      ],
      gradiLongInput: ['',
        [
          Validators.min(0),
          Validators.max(359),
          Validators.pattern('[0-9]{1,3}')
        ]
      ],
      minutiLongInput: ['',
        [
          Validators.min(0),
          Validators.max(59),
          Validators.pattern('[0-9]{1,2}')
        ]
      ],
      secondiLongInput: ['',
        [
          Validators.min(0),
          Validators.max(59),
          Validators.pattern('[0-9]{1,2}|[0-9]{1,2}.[0-9]{1,4}')
        ]
      ],
      estOvestSelect: ['E',
        [
        ]
      ],
      lunghezzaPistaInput: ['',
        [
          Validators.min(0),
          Validators.max(9999),
          Validators.pattern(/^[0-9]\d*$/)
        ]
      ],
      tipoPistaSelect: ['false',
        [
        ]
      ],
      indirizzoInput: ['',
        [
          Validators.maxLength(100)
        ]
      ],
      telefonoInput: ['',
        [
          Validators.maxLength(50)
        ]
      ],
      emailInput: ['',
        [
          Validators.email,
          Validators.maxLength(50)
        ]
      ],
      webInput: ['',
        [
          Validators.maxLength(50)
        ]
      ],
      noteInput: ['',
        [
          Validators.maxLength(4000)
        ]
      ],
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
