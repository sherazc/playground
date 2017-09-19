import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Form01ButtonClickComponent } from './form01-button-click/form01-button-click.component';

@NgModule({
  declarations: [AppComponent, Form01ButtonClickComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  

}
