import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../services/item/item.service';
import {ActivatedRoute} from '@angular/router';
import {Item} from '../../services/modal/Item';

@Component({
  selector: 'app-view-item-detail',
  templateUrl: './view-item-detail.component.html',
  styleUrls: ['./view-item-detail.component.css']
})
export class ViewItemDetailComponent implements OnInit {

  item: Item;
  constructor(private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.item = this.itemService.findItemById(this.route.pathFromRoot[3].snapshot.params.itemId);
  }
}
