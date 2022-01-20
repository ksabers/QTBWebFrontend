import { Validators } from '@angular/forms';

export class ManutenzioniAddForm {

    public get campi() {
        return this._campi;
    }
    
    private _campi = {
        aereoSelect:                ['',         [Validators.required]],
        tipoManutenzioneSelect:     ['',         [Validators.required]],
        manutenzioneOrdinariaRadio: [true,       [Validators.required]],
        dataManutenzioneInput:      [new Date(), [Validators.required]],
        personaSelect:              [-1                               ],
        voloSelect:                 [null                             ],
        descrizioneInput:           ['',  [Validators.maxLength(4000)]],
        presenzaScadenza:           [false,      [Validators.required]],
        espressaInOreVolo:          [false,                          ],
        espressaInData:             [false                            ],
        oreAssoluteRadio:           [{value: 'assolute', disabled: true},                      ],
        dataAssolutaRadio:          [{value: 'assolute', disabled: true}                       ],
        oreAssoluteInput:           [{value: null, disabled: true},                             ],
        oreDeltaInput:              [{value: null, disabled: true},                             ],
        dataAssolutaInput:          [{value: null, disabled: true},                             ],
        giorniDeltaInput:          [{value: null, disabled: true},                             ]
    
    }
}