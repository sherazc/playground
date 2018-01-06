import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AddService} from './add.service';
import {SubtractService} from './subtract.service';
import {CalculatorService} from './calculator.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AddService, SubtractService, CalculatorService],
  declarations: []
})
export class ServicesModule { }
