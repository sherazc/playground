import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {routing} from './app.routes';

import {AppComponent} from './app.component';
import {LayoutsModule} from './layouts/layouts.module';
import {ComponentsModule} from './components/components.module';
import {ServicesModule} from './services/services.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    routing,
    LayoutsModule,
    ComponentsModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
