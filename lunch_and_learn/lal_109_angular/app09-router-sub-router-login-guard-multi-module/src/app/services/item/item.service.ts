import { Injectable } from '@angular/core';
import {Item} from '../modal/Item';

@Injectable()
export class ItemService {

  private items: Item[];

  constructor() {
    this.items = [
      {id: 1001, name: 'Item 1001', price: 10, description: 'Item 1001 Description', dimension: '1lx1wx1d'},
      {id: 1002, name: 'Item 1002', price: 20, description: 'Item 1002 Description', dimension: '2lx2wx2d'},
      {id: 1003, name: 'Item 1003', price: 30, description: 'Item 1003 Description', dimension: '3lx3wx3d'},
      {id: 1004, name: 'Item 1004', price: 40, description: 'Item 1004 Description', dimension: '4lx4wx4d'},
    ];
  }

  loadItem(): Item[] {
    return this.items;
  }

  findItemById(id: any): Item {
    return this.items.find(item => item.id === parseInt(id));
  }
}
