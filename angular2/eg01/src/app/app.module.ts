import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { HelloWorld }  from './components/hello_world.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, HelloWorld],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
