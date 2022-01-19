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
        descrizioneInput:           ['',         [Validators.maxLength(4000)]],
        scadenzaRadio:              [false,       [Validators.required]]
    }
}