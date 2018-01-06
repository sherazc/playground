import { Injectable } from '@angular/core';
import { AddService } from './add.service';
import { SubtractService } from './subtract.service';

@Injectable()
export class CalculatorService {

  constructor(public addService: AddService, public subtractService: SubtractService) { }

  add(a: number, b: number) {
    return this.addService.add(a, b);
  }

  subtract(a: number, b: number) {
    return this.subtractService.subtract(a, b);
  }
}
