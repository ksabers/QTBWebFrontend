import { AereoPosseduto } from '../aerei/aereo-posseduto';

export class Persona {
  id: number;
  pilota: boolean;
  nome: string;
  cognome: string;
  indirizzo: string;
  dataNascita: Date;
  luogoNascita: string;
  codiceFiscale: string;
  email: string;
  citta: string;
  cap: string;
  telefono: string;
  numeroVoliDaPilota: number;
  numeroVoliDaPasseggero: number;
  minutiPregressi: number;
  minutiVoloDaPilota: number;
  minutiVoloDaPasseggero: number;
  idAeroportoBase: number;
  aeroportoBase: string;
  tessera: string;
  aereiPosseduti: AereoPosseduto[];
}
