import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
    component: ProfileComponent}, // Path parameter :id
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
    AppComponent, // AppComponent root component contains main nav
    ProfileComponent,
    AboutComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ // 2 lines below will make Hash base URL. If Commented then it use HTML5 URL
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
