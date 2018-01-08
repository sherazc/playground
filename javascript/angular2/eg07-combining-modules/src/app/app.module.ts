import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { CalculatorService } from './services/calculator.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
