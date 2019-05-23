import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

    selectedIndex: number;

    constructor(private navigationService: NavigationService,
                private authenticationService: AuthenticationService) {

    }

    ngOnInit() {
        this.navigationService.selectedTabIndex().subscribe((value) => {
            this.selectedIndex = value;
        });
    }

}
