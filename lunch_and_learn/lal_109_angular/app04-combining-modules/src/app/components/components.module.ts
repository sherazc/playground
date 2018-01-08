import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator/calculator.component';
import { ServicesModule } from '../services/services.module';
import { CalculatorService } from '../services/calculator.service';

@NgModule({
  imports: [CommonModule, ServicesModule],
  providers: [CalculatorService],
  declarations: [CalculatorComponent],
  exports: [CalculatorComponent]
})
export class ComponentsModule { }
