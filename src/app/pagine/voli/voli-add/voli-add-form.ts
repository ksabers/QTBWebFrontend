import { Validators } from '@angular/forms';
import { UtilsService } from '../../../servizi/utils/utils.service';
import { environment } from './../../../../environments/environment';

export class VoliAddForm {
constructor(private utils: UtilsService) {}

public get campi() {
  return this._campi;
}

 private _campi = {
    aereoSelect:                ['',                         [Validators.required]],
    pilotaSelect:               ['',                         [Validators.required]],
    passeggeroSelect:           ['',                         []],
    dataOraAtterraggioInput:    [this.utils.LocalDateTime(), [Validators.required]],
    oreDecolloInput:            ['',                         [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    minutiDecolloInput:         ['',                         [Validators.required,
                                                              Validators.pattern(/^[0-9]\d*$/),
                                                              Validators.min(0),
                                                              Validators.max(59)]],
    oreAtterraggioInput:        ['',                         [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    minutiAtterraggioInput:     ['',                         [Validators.required,
                                                              Validators.pattern(/^[0-9]\d*$/),
                                                              Validators.min(0),
                                                              Validators.max(59)]],
    aeroportoDecolloSelect:     ['',                         [Validators.required]],
    aeroportoAtterraggioSelect: ['',                         [Validators.required]],
    descrizioneInput:           ['',                         [Validators.maxLength(4000)]],
    carburanteInizialeSXInput:  ['',                         [Validators.pattern(/^[0-9]\d*$/)]],
    carburanteInizialeDXInput:  ['',                         [Validators.pattern(/^[0-9]\d*$/)]],
    carburanteAggiuntoSXInput:  ['',                         [Validators.pattern(/^[0-9]\d*$/)]],
    carburanteAggiuntoDXInput:  ['',                         [Validators.pattern(/^[0-9]\d*$/)]],
    olioInput:                  ['',                         [Validators.pattern(/^[0-9]\d*$/)]],
    pesoOccupantiInput:         [environment.pesoMedio,      [Validators.pattern(/^[0-9]\d*$/)]],
    bagaglioInput:              ['',                         [Validators.pattern(/^[0-9]\d*$/)]]
  }
}
