import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicMenuComponent} from './public-menu/public-menu.component';
import {AdminMenuComponent} from './admin-menu/admin-menu.component';
import {CustomerMenuComponent} from './customer-menu/customer-menu.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {ViewItemsComponent} from './view-items/view-items.component';
import {AddItemComponent} from './add-item/add-item.component';
import {EditItemComponent} from './edit-item/edit-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PublicMenuComponent,
    AdminMenuComponent,
    CustomerMenuComponent,
    AboutComponent,
    LoginComponent,
    ViewItemsComponent,
    AddItemComponent,
    EditItemComponent],
  exports: [
    PublicMenuComponent,
    CustomerMenuComponent,
    AdminMenuComponent,
    LoginComponent
  ]
})
export class ComponentsModule {
}
