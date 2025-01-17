// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  APIUrl: 'https://localhost:44300',
  copyrightBy: 'Giorgio Borgo',
  titoloApplicazione: 'QTBWeb',
  giorniScadenze: 30,  // entro quanti giorni da oggi una scadenza è "in scadenza"
  oreScadenze: 1,  // entro quante ore di volo una scadenza è "in scadenza"
  dashboardPiloti: 5,
  dashboardAerei: 5,
  pesoMedio: 70,
  densitaCarburante: 0.75,
  linguaggi:
  [
    {codice: 'it-IT', nome: 'Italiano'},  // il primo linguaggio è quello di default
    {codice: 'en-US', nome: 'English'}
  ],
  mappa: {
    tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribuzione: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
