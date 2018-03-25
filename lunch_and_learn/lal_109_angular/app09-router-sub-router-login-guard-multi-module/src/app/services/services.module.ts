import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemService} from './item/item.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ItemService]
})
export class ServicesModule {
}
