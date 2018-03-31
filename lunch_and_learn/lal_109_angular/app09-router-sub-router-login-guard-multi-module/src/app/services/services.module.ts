import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemService} from './item/item.service';
import {AuthenticationService} from './authentication/authentication.service';
import {AuthenticationGuard} from './guard/authentication.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ItemService,
    AuthenticationService,
    AuthenticationGuard,
  ]
})
export class ServicesModule {
}
