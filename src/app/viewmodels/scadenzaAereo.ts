export class ScadenzaAereo {
  aereo: number;
  modello: string;
  marche: string;
  scadenzeAereo: [
    {
      id: number;
      tipo: string;
      data: string;
      note: string;
    }
  ];
}
