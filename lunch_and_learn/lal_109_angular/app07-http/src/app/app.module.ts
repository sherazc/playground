import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BlogService } from './services/blog.service';
import { SERVICE_ENDPOINT} from './myConfigs';
import {service_end_point} from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [BlogService, {provide: SERVICE_ENDPOINT, useValue: service_end_point}],
  bootstrap: [AppComponent]
})
export class AppModule { }
