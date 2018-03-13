import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, NgbModule.forRoot()],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
