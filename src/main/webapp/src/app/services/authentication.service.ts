import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {NavigationService} from './navigation.service';
import {User} from '../models/user';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    user: User = null;

    constructor(private http: HttpClient, private navigationService: NavigationService) {

    }

    login(name: string): Observable<User> {
        return this.http.post<User>(environment.baseURL + '/api/users/login', {name}).pipe(
            tap(response => {
                this.user = response;
            })
        );
    }

    register(name: string): Observable<User> {
        return this.http.post<User>(environment.baseURL + '/api/users/register', {name}).pipe(
            tap(response => {
                this.user = response;
            })
        );
    }

    logout() {
        this.user = null;
        this.navigationService.selectUserTab();
    }

    isLoggedIn() {
        return this.user != null;
    }

}
