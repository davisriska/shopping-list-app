import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {AuthenticationService} from '../../services/authentication.service';
import {MatSnackBar} from '@angular/material';

class Form {
    name: string;
}

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    loginForm: Form;
    registerForm: Form;

    constructor(private navigationService: NavigationService,
                private authenticationService: AuthenticationService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.loginForm = new Form();
        this.registerForm = new Form();
    }

    onSubmitLogin() {
        this.authenticationService.login(this.loginForm.name).subscribe((response) => {
            if (this.authenticationService.isLoggedIn()) {
                this.navigationService.selectProductListTab();
            }
        }, (response) => {
            this.snackBar.open(response.error, null, {
                duration: 2000,
            });
        });
    }

    onSubmitRegister() {
        this.authenticationService.register(this.registerForm.name).subscribe((response) => {
            if (this.authenticationService.isLoggedIn()) {
                this.navigationService.selectProductListTab();
            }
        }, (response) => {
            this.snackBar.open(response.error, null, {
                duration: 2000,
            });
        });
    }

    logout() {
        this.authenticationService.logout();
    }

}
