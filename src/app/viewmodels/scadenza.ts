export class Scadenza {
  persona: number;
  nome: string;
  cognome: string;
  scadenzePersona: [
    {
      id: number;
      tipo: string;
      data: string;
      note: string;
    }
  ];
  scadenzeAerei: [
    {
      aereo: number,
      modello: string,
      marche: string,
      scadenzeAereo: [
        {
          id: number;
          tipo: string;
          data: string;
          note: string;
        }
      ]
    }
  ];
}
