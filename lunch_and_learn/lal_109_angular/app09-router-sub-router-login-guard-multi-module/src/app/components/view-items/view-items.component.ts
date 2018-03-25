import { Component, OnInit } from '@angular/core';
import {Item} from '../../services/modal/Item';
import {ItemService} from '../../services/item/item.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {

  public items: Item[];

  constructor(private itemsService: ItemService) {}

  ngOnInit() {
    this.items = this.itemsService.loadItem();
  }
}
