import { ScadenzeAereo } from "./scadenzeAereo";
import { ScadenzaGenerica } from "./scadenzaGenerica";

export class Scadenza {
  persona: number;
  nome: string;
  cognome: string;
  minutiPregressi: number;
  minutiVoloDaPilota: number;
  scadenzePersona: ScadenzaGenerica[];
  scadenzeAerei: ScadenzeAereo[];
}
