import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BlogService } from './services/blog.service';
import { SERVICE_ENDPOINT} from './myConfigs';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [BlogService, {provide: SERVICE_ENDPOINT, useValue: 'https://jsonplaceholder.typicode.com/post'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
