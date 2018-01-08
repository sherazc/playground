import { Injectable } from '@angular/core';

@Injectable()
export class SubtractService {
  subtract(a: number, b: number) {
    return a - b;
  }
}
