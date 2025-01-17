import { Proprietario } from '../persone/proprietario';
import { Volo } from '../voli/volo';

export class Aereo {
  id: number;
  costruttore: string;
  modello: string;
  marche: string;
  minutiPregressi: number;
  minutiVolo: number;
  pesoVuoto: number;
  voloPiuRecente: Volo;
  proprietari: Proprietario[];
}
