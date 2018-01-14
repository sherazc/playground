import { Component, Inject } from '@angular/core';
import { BlogService } from './services/blog.service';
import { SERVICE_ENDPOINT } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts: Array<any>;

  constructor(private blogService: BlogService, @Inject(SERVICE_ENDPOINT) private serviceEndpoint: string) { 
    console.log(serviceEndpoint);
  }

  getAllBlogPosts() {
    this.blogService.getAllBlogPosts();
  }

  createNewBlogPost() {
    this.blogService.createNewBlogPost();
  }
}
