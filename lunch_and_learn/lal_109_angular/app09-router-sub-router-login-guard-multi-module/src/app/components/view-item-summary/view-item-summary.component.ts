import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../services/item/item.service';
import {ActivatedRoute} from '@angular/router';
import {Item} from '../../services/modal/Item';

@Component({
  selector: 'app-view-item-summary',
  templateUrl: './view-item-summary.component.html',
  styleUrls: ['./view-item-summary.component.css']
})
export class ViewItemSummaryComponent implements OnInit {

  item: Item;

  constructor(private itemService: ItemService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Note pathFromRoot. pathFromRoot[0] is root /
    // We cant do this.route.snapshot.params.itemId because itemId exist in the parent route
    this.item = this.itemService.findItemById(this.route.pathFromRoot[3].snapshot.params.itemId);
  }
}
