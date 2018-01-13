import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

const childRoutes: Routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/:id',
    component: ProfileComponent}, // Para
];

const routes: Routes = [
  {path: '', redirectTo: 'home',
    pathMatch: 'full'}, // if no path then redirect to /home
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'user',
    children: childRoutes} // child routes. all have "/user" prefix
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AboutComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' } // <--- this right here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
