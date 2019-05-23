import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BaseComponent} from './components/base/base.component';
import {HttpClientModule} from '@angular/common/http';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule
} from '@angular/material';
import {UserComponent} from './components/user/user.component';
import {FormsModule} from '@angular/forms';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {ProductListComponent} from './components/product-list/product-list.component';

@NgModule({
    declarations: [
        AppComponent,
        BaseComponent,
        UserComponent,
        ProductListComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSidenavModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatProgressBarModule,
        MatButtonModule,
        FormsModule,
        NgProgressModule,
        NgProgressHttpModule,
        MatPaginatorModule,
        MatTableModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
