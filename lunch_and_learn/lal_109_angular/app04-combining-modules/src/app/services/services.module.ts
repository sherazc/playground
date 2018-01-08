import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddService } from './add.service';
import { SubtractService } from './subtract.service';

@NgModule({
  imports: [CommonModule],
  providers: [AddService, SubtractService]
})
export class ServicesModule { }
