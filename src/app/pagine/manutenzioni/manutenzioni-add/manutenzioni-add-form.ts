import { Validators } from '@angular/forms';

export class ManutenzioniAddForm {

    public get campi() {
        return this._campi;
    }
    
    private _campi = {
        aereoSelect:                [null,         [Validators.required]],
        tipoManutenzioneSelect:     [null,         [Validators.required]],
        manutenzioneOrdinariaRadio: [true,       [Validators.required]],
        dataManutenzioneInput:      [new Date(), [Validators.required]],
        personaSelect:              [-1                               ],
        voloSelect:                 [null                             ],
        descrizioneInput:           ['',  [Validators.maxLength(4000)]],
        presenzaScadenza:           [{value: false, disabled: true}, ],
        espressaInOreVolo:          [false,                          ],
        espressaInData:             [false                            ],
        oreAssoluteRadio:           [{value: 'assolute', disabled: true}],
        dataAssolutaRadio:          [{value: 'assolute', disabled: true}],
        oreAssoluteInput:           [{value: null, disabled: true}, [Validators.required]],
        oreDeltaInput:              [{value: null, disabled: true}, [Validators.min(1), Validators.required]],
        dataAssolutaInput:          [{value: null, disabled: true}, [Validators.required]],
        giorniDeltaInput:           [{value: null, disabled: true}, [Validators.min(0), Validators.required]],
        tipoScadenzaAereoSelect:    [{value: null, disabled: true}, [Validators.required]],
        noteScadenzaInput:          ['',                            [Validators.maxLength(4000)]]
    
    }
}