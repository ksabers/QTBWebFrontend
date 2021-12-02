import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { AuthenticationService } from './../../../auth/auth.service';
import { AereiService } from './../../../servizi/aerei.service/aerei.service';
import { PersoneService } from './../../../servizi/persone.service/persone.service';
import { AeroportiService } from './../../../servizi/aeroporti.service/aeroporti.service';
import { VoliService } from './../../../servizi/voli.service/voli.service';
import { UtilsService } from './../../../servizi/utils.service/utils.service';
import { Aereo } from './../../../viewmodels/aereo';
import { Persona } from './../../../viewmodels/persona';
import { Aeroporto } from './../../../viewmodels/aeroporto';
import { Router } from '@angular/router';
import { Volo } from 'src/app/viewmodels/voli/volo';

// Validatore custom che controlla che l'orametro finale sia successivo all'orametro iniziale
// Viene applicato a livello di form
const ValidatoreOrametro: ValidatorFn = (fg: FormGroup) => {
  const decollo = fg.get('oreDecolloInput').value * 60 + fg.get('minutiDecolloInput').value;
  const atterraggio = fg.get('oreAtterraggioInput').value * 60 + fg.get('minutiAtterraggioInput').value;
  return decollo !== null && atterraggio !== null && decollo < atterraggio
    ? null
    : { orametro: true };
};

// Validatore custom che controlla che il passeggero non sia uguale al pilota
// Viene applicato a livello di form
const ValidatorePasseggero: ValidatorFn = (fg: FormGroup)  => {
  const pilota = fg.get('pilotaSelect').value.id;
  const passeggero = fg.get('passeggeroSelect').value.id;
  return pilota != null &&  pilota != passeggero
    ? null
    : { passeggero: true };
};

@Component({
  selector: 'app-voli-add',
  templateUrl: './voli-add.component.html',
  styleUrls: ['./voli-add.component.scss']
})
export class VoliAddComponent implements OnInit {

  addVoloForm: FormGroup;

  listaAerei: Aereo[];
  listaPiloti: Persona[];
  listaPasseggeri: Persona[];
  listaAeroporti: Aeroporto[];

  oraDecollo: string;
  durataVolo: number;

  submitting = false;

  constructor(private auth: AuthenticationService,
              private aereiAPI: AereiService,
              private personeAPI: PersoneService,
              private aeroportiAPI: AeroportiService,
              private voliAPI: VoliService,
              private fb: FormBuilder,
              private router: Router,
              private utils: UtilsService) { }

  ngOnInit(): void {

    // Campi del reactive form
    this.addVoloForm = this.fb.group({
      aereoSelect: ['',
        [
          Validators.required
        ]
      ],
      pilotaSelect: ['',
        [
          Validators.required
        ]
      ],
      passeggeroSelect: '',
      dataOraAtterraggioInput: [this.utils.LocalDateTime(), 
        [
          Validators.required
        ]
      ],
      oreDecolloInput: ['',
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/)
        ]
      ],
      minutiDecolloInput: ['',
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/),
          Validators.min(0),
          Validators.max(59)
        ]
      ],
      oreAtterraggioInput: ['',
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/)
        ]
      ],
      minutiAtterraggioInput: ['',
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/),
          Validators.min(0),
          Validators.max(59)
        ]
      ],
      aeroportoDecolloSelect: ['', 
        [
          Validators.required
        ]
      ],
      aeroportoAtterraggioSelect: ['',
        [
          Validators.required
        ]
      ],
      descrizioneInput: ['',
        [
          Validators.maxLength(4000)
        ]
      ],

      carburanteInizialeSXInput: ['',
        [
          Validators.pattern(/^[0-9]\d*$/)
        ]
      ],
      carburanteInizialeDXInput: ['',
        [
          Validators.pattern(/^[0-9]\d*$/)
        ]
      ],
      carburanteAggiuntoSXInput: ['',
        [
          Validators.pattern(/^[0-9]\d*$/)
        ]
      ],
      carburanteAggiuntoDXInput: ['',
        [
          Validators.pattern(/^[0-9]\d*$/)
        ]
      ],
      olioInput: ['',
        [
          Validators.pattern(/^[0-9]\d*$/)
        ]
      ]
    }, 
    { validators: [ValidatoreOrametro, ValidatorePasseggero]});  // questi sono i validatori a livello di form

    this.aereiAPI.getList().subscribe(data => {
      this.listaAerei = data;
      this.personeAPI.getList().subscribe(data => {
        this.listaPiloti = data.filter(persona => persona.pilota == true);
        this.listaPasseggeri = data;
        this.aeroportiAPI.getList().subscribe(data => {
          this.listaAeroporti = data;

          // Se l'utente collegato è un pilota, lo seleziona
          let pilotaCorrente = this.listaPiloti.find(pilota => pilota.id === this.auth.currentUserValue.persona);
          if (pilotaCorrente) {
            this.addVoloForm.patchValue({
              pilotaSelect: pilotaCorrente
            });  
          }
        });
      });      
    });
  }


  /**
   * Evento sul cambiamento della select aerei. Riempie i campi dell'orametro iniziale con i valori
   * dell'ultimo volo, e la select di decollo con l'aeroporto dell'atterraggio più recente
   *
   * @memberof VoliAddComponent
   */
  cambiaAereo(): void {
    this.addVoloForm.patchValue({
      oreDecolloInput: this.addVoloForm.value.aereoSelect.voloPiuRecente.orametroOreFine,
      minutiDecolloInput: this.addVoloForm.value.aereoSelect.voloPiuRecente.orametroMinutiFine,
      oreAtterraggioInput: null,
      minutiAtterraggioInput: null,
      aeroportoDecolloSelect: this.listaAeroporti.find(aeroporto => aeroporto.id === this.addVoloForm.value.aereoSelect.voloPiuRecente.aeroportoFine)
    });
    this.addVoloForm.get('oreAtterraggioInput').setErrors(null);
    this.addVoloForm.get('minutiAtterraggioInput').setErrors(null);
    this.aggiornaDurata();
  }
  
  aggiornaDurata(): void {

    if (this.addVoloForm.value.oreAtterraggioInput &&
        this.addVoloForm.value.minutiAtterraggioInput &&
        this.addVoloForm.value.oreDecolloInput &&
        this.addVoloForm.value.minutiDecolloInput) {

          this.durataVolo = ((this.addVoloForm.value.oreAtterraggioInput * 60 + this.addVoloForm.value.minutiAtterraggioInput) -
                      (this.addVoloForm.value.oreDecolloInput * 60 + this.addVoloForm.value.minutiDecolloInput));
         }
         else {
           this.durataVolo = 0;
         }
    let dataIniziale = new Date(this.addVoloForm.value.dataOraAtterraggioInput);
    dataIniziale.setMinutes(dataIniziale.getMinutes() - this.durataVolo);

    if (!isNaN(dataIniziale.getHours()) && !isNaN(dataIniziale.getMinutes())) {
      this.oraDecollo = this.utils.addZero(dataIniziale.getHours()) + ':' + this.utils.addZero(dataIniziale.getMinutes());
    } else {
      this.oraDecollo = '';
    }
  }

  tornaPaginaVoli(): void {
    this.router.navigate(['voli']);
  }

  submitForm(): void {
    this.submitting = true;
    console.log('entrato in submit');
    const nuovoVolo: Volo = {
      id: -1,
      descrizione: this.addVoloForm.get('descrizioneInput').value || '',
      idAereo: this.addVoloForm.get('aereoSelect').value.id,
      modello: '',
      marche: '',
      idPilota: this.addVoloForm.get('pilotaSelect').value.id || -1,
      nomePilota: '',
      cognomePilota: '',
      idPasseggero: this.addVoloForm.get('passeggeroSelect').value.id || -1,
      nomePasseggero: '',
      cognomePasseggero: '',
      oraInizio: new Date(),
      orametroOreInizio: this.addVoloForm.get('oreDecolloInput').value,
      orametroMinutiInizio: this.addVoloForm.get('minutiDecolloInput').value,
      oraFine: new Date(),
      orametroOreFine: this.addVoloForm.get('oreAtterraggioInput').value,
      orametroMinutiFine:  this.addVoloForm.get('minutiAtterraggioInput').value,
      durata: 0,
      carburanteInizialeSx:  this.addVoloForm.get('carburanteInizialeSXInput').value,
      carburanteInizialeDx: this.addVoloForm.get('carburanteInizialeDXInput').value,
      carburanteAggiuntoSx: this.addVoloForm.get('carburanteAggiuntoSXInput').value,
      carburanteAggiuntoDx: this.addVoloForm.get('carburanteAggiuntoDXInput').value,
      olio: this.addVoloForm.get('olioInput').value,
      idAeroportoInizio: this.addVoloForm.get('aeroportoDecolloSelect').value.id,
      aeroportoInizio: '',
      idAeroportoFine: this.addVoloForm.get('aeroportoAtterraggioSelect').value.id,
      aeroportoFine: ''
    };
    console.log('const volo: ' + JSON.stringify(nuovoVolo));
     this.voliAPI.add(nuovoVolo).subscribe(data => {
    console.log('data: ' + JSON.stringify(data));
    this.tornaPaginaVoli();
    }); 

  }
}
