import { Validators } from '@angular/forms';

export class ManutenzioniAddForm {

    public get campi() {
        return this._campi;
    }
    
    private _campi = {
        aereoSelect:                ['',                         [Validators.required]],
        tipoManutenzioneSelect:     ['',                         [Validators.required]],
        manutenzioneOrdinariaRadio: ['',                         [Validators.required]],
        dataManutenzioneInput:      ['',                         [Validators.required]]
    }
}