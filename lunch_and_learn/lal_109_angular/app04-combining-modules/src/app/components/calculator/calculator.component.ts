import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  result: number;
  constructor(private calculator: CalculatorService) { }

  addInputs(numA: HTMLInputElement, numB: HTMLInputElement) {
    this.result = this.calculator.add(+numA.value, +numB.value);
  }

  subtractInputs(numA: HTMLInputElement, numB: HTMLInputElement) {
    this.result = this.calculator.subtract(+numA.value, +numB.value);
  }
}
