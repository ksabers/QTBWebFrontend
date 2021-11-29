import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {TranslateService} from '@ngx-translate/core';
import { AuthenticationService } from './auth/auth.service';
import { Utente } from './viewmodels/utente';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentUser: Utente;

  constructor(private titleService: Title,
              private translate: TranslateService,
              private authenticationService: AuthenticationService) {
    this.titleService.setTitle(environment.titoloApplicazione);
    translate.setDefaultLang(environment.linguaggi[0].codice);

    if (!translate.currentLang) {
      translate.use(environment.linguaggi[0].codice);
    }

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
}
