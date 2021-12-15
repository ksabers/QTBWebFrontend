import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TipiAeroportiService } from 'src/app/servizi/tipi-aeroporti.service/tipi-aeroporti.service';
import { TipoAeroporto } from 'src/app/viewmodels/tipi-aeroporti/tipo-aeroporto';

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
    });

    this.tipiAeroportiAPI.getList().subscribe(data => {
      this.listaTipiAeroporti = data;
      this.loading = false;  // toglie lo spinner
    })
  }

  tornaPaginaAeroporti(): void {
    this.router.navigate(['aeroporti']);
  }

  submitForm(): void {

  }
}
