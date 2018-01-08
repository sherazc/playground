import { Injectable } from '@angular/core';

@Injectable()
export class AddService {
  add(a: number, b: number) {
    return a + b;
  }
}
