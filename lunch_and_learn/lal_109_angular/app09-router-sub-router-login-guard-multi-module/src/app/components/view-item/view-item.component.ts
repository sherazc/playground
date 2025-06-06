import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../services/item/item.service';
import {ActivatedRoute} from '@angular/router';
import {Item} from '../../services/modal/Item';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {

  item: Item;
  constructor(private itemService: ItemService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.item = this.itemService.findItemById(this.route.snapshot.params.itemId);
  }

}
