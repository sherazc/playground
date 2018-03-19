import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './layouts/main/main.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {path: '', component: MainComponent,
    /*
    children: [
      {path: 'login', component: LoginComponent}
    ]

    */
  }
];

export const routing = RouterModule.forRoot(routes);
