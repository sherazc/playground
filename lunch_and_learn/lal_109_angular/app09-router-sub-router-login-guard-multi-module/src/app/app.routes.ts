import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './layouts/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {SubLoginComponent} from './layouts/sub-login/sub-login.component';

const routes: Routes = [
  {path: '', component: MainComponent,
    children: [
      {path: '', component: SubLoginComponent,
        children: [
          {path: 'view-items'}
        ]
      },
      {path: 'login', component: LoginComponent}
    ]
    /*
    children: [
      {path: 'login', component: LoginComponent}
    ]

    */
  }
];

export const routing = RouterModule.forRoot(routes);
