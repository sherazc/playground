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
import {RouterModule} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { ViewItemSummaryComponent } from './view-item-summary/view-item-summary.component';
import { ViewItemDetailComponent } from './view-item-detail/view-item-detail.component';
import {ServicesModule} from "../services/services.module";
import {FormsModule} from "@angular/forms";
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ServicesModule,
  ],
  declarations: [
    PublicMenuComponent,
    AdminMenuComponent,
    CustomerMenuComponent,
    AboutComponent,
    LoginComponent,
    ViewItemsComponent,
    AddItemComponent,
    EditItemComponent,
    FooterComponent,
    ViewItemComponent,
    ViewItemSummaryComponent,
    ViewItemDetailComponent,
    UnAuthorizedComponent,
    NotFoundComponent],
  exports: [
    PublicMenuComponent,
    CustomerMenuComponent,
    AdminMenuComponent,
    FooterComponent,
  ]
})
export class ComponentsModule {
}
