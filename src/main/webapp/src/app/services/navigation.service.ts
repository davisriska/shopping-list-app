import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    private selectedTabIndexSubject = new BehaviorSubject<number>(0);

    constructor() {

    }

    public selectUserTab() {
        this.selectedTabIndexSubject.next(0);
    }

    public selectProductListTab() {
        this.selectedTabIndexSubject.next(1);
    }

    public selectedTabIndex() {
        return this.selectedTabIndexSubject.asObservable();
    }

}
