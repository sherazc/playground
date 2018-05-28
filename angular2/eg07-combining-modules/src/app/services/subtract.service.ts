import { Injectable } from '@angular/core';

@Injectable()
export class SubtractService {

  constructor() { }

  subtract(a: number, b: number) {
    return a - b;
  }
}
