import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TransferStateInterceptor} from './transfer_state/transfer-state.interceptor';
import {TransferStateService} from './transfer_state/transfer-state.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'my-app'}),
        RouterModule.forRoot([
            {path: '', component: HomeComponent, pathMatch: 'full'},
            {path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
            {path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
        ]),
        HttpClientModule,
        BrowserTransferStateModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: TransferStateInterceptor, multi: true},
        TransferStateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
