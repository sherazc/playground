import { Injectable } from '@angular/core';

@Injectable()
export class AddService {

  constructor() { }

  add(a: number, b: number) {
    return a + b;
  }
}
