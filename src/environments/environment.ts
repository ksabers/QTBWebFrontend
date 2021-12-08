// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  APIUrl: 'https://localhost:5001',
  copyrightBy: 'Giorgio Borgo',
  titoloApplicazione: 'QTBWeb',
  giorniScadenze: 60,
  dashboardPiloti: 5,
  dashboardAerei: 5,
  linguaggi:
  [
    {codice: 'it-IT', nome: 'Italiano'},
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
