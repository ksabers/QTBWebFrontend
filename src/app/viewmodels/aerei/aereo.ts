import { Proprietario } from '../proprietario';
import { Volo } from '../voli/volo';

export class Aereo {
  id: string;
  costruttore: string;
  modello: string;
  marche: string;
  minutiPregressi: number;
  minutiVolo: number;
  pesoVuoto: number;
  voloPiuRecente: Volo;
  proprietari: Proprietario[];
}
