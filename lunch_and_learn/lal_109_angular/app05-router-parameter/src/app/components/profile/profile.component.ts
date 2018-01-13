import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileId: number;
  constructor(private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => this.profileId = params['id']);
  }
}
