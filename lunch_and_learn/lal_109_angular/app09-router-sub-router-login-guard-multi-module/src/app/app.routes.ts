import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './layouts/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {SubLoginComponent} from './layouts/sub-login/sub-login.component';
import {ViewItemsComponent} from './components/view-items/view-items.component';
import {AddItemComponent} from './components/add-item/add-item.component';
import {EditItemComponent} from './components/edit-item/edit-item.component';
import {ViewItemComponent} from './components/view-item/view-item.component';
import {ViewItemSummaryComponent} from './components/view-item-summary/view-item-summary.component';
import {ViewItemDetailComponent} from './components/view-item-detail/view-item-detail.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: '', component: SubLoginComponent,
        children: [
          {path: '', component: ViewItemsComponent},
          {path: 'view-items', component: ViewItemsComponent},
          {path: 'view-item/:itemId', component: ViewItemComponent,
            children: [
              {path: '', redirectTo: 'summary', pathMatch: 'full'},
              {path: 'summary', component: ViewItemSummaryComponent},
              {path: 'detail', component: ViewItemDetailComponent}
            ]
          },
          {path: 'add-item', component: AddItemComponent},
          {path: 'edit-item/:itemId', component: EditItemComponent}
        ]
      },
      {path: 'login', component: LoginComponent}
    ]
  }
];

export const routing = RouterModule.forRoot(routes);
