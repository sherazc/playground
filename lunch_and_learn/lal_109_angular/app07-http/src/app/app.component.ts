import { Component, Inject } from '@angular/core';
import { BlogService } from './services/blog.service';
import { SERVICE_ENDPOINT } from './myConfigs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts: Array<any>;

  constructor(private blogService: BlogService) {}

  getAllBlogPosts() {
    this.blogService.getAllBlogPosts();
  }

  createNewBlogPost() {
    this.blogService.createNewBlogPost();
  }
}
