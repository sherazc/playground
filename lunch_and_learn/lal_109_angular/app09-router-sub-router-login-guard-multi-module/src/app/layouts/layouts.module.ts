import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {SubLoginComponent} from './sub-login/sub-login.component';
import {ComponentsModule} from '../components/components.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ],
  declarations: [MainComponent, SubLoginComponent],
  exports: [MainComponent, SubLoginComponent]
})
export class LayoutsModule {
}
