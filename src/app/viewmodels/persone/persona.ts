import { AereoPosseduto } from '../aerei/aereo-posseduto';

export class Persona {
  id: number;
  pilota: boolean;
  nome: string;
  cognome: string;
  email: string;
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
