import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Utente } from './../viewmodels/utente';
import { Login } from './../viewmodels/login';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Utente>;
    public currentUser: Observable<Utente>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Utente>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Utente {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string): Observable<Utente> {
      console.log("entrato in servizio di autenticazione: " + username + " " + password);
      const model = new Login();
      model.email = username;
      model.password = password;
      return this.http.post<Utente>(`${environment.APIUrl}/api/login/authenticate`, model)
        .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }));
    }

    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
