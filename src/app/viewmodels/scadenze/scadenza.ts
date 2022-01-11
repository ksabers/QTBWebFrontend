import { ScadenzaGenerica } from "./scadenzaGenerica";

export class Scadenza {
  persona: number;
  nome: string;
  cognome: string;
  minutiPregressi: number;
  minutiVoloDaPilota: number;
  scadenzePersona: ScadenzaGenerica[];
  scadenzeAerei: [
    {
      aereo: number,
      modello: string,
      marche: string,
      minutiPregressi: number,
      minutiVolo: number,
      scadenzeAereo: ScadenzaGenerica[]
    }
  ];
}
