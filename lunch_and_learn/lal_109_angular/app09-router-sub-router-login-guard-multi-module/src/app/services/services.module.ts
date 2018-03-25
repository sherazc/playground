import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemService} from './item/item.service';
import {AuthenticationService} from './authentication/authentication.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ItemService,
    AuthenticationService
  ]
})
export class ServicesModule {
}
