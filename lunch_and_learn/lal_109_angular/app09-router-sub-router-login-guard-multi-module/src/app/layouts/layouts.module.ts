import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SubLoginComponent } from './sub-login/sub-login.component';

@NgModule({
  imports: [
    CommonModule],
  declarations: [MainComponent, SubLoginComponent],
  exports: [MainComponent, SubLoginComponent]
})
export class LayoutsModule { }
