import { Injectable } from '@angular/core';
import {Item} from '../modal/Item';

@Injectable()
export class ItemService {

  private items: Item[];

  constructor() {
    this.items = [
      {id: 1001, name: 'Item 1011'},
      {id: 1002, name: 'Item 1002'},
      {id: 1003, name: 'Item 1003'},
      {id: 1004, name: 'Item 1004'}
    ];
  }

  loadItem(): Item[] {
    return this.items;
  }

  findItemById(id: number): Item {
    return this.items.find(item => item.id === id - 0);
  }
}
