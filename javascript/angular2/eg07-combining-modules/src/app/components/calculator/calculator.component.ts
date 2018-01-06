import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public numA: number;
  public numB: number;
  public result: number;

  constructor(public calculatorService: CalculatorService) {
    console.log('calculatorService=', calculatorService);
  }

  ngOnInit() {}

  addNumbers() {
    this.result = this.calculatorService.add(this.numA, this.numB);
  }

  subtractNumber() {
    this.result = this.calculatorService.subtract(this.numA, this.numB);
  }
}
