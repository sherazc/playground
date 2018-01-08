import { Injectable } from '@angular/core';
import { SubtractService } from './subtract.service';
import { AddService } from './add.service';

@Injectable()
export class CalculatorService {

  constructor(private addService: AddService,
    private subtractService: SubtractService) {}

    add(a: number, b: number) {
      return this.addService.add(a, b);
    }

    subtract(a: number, b: number) {
      return this.subtractService.subtract(a, b);
    }
}
