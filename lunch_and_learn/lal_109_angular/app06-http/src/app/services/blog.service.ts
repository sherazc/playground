import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_ENDPOINT } from '../app.module';

@Injectable()
export class BlogService {
    constructor(private httpClient: HttpClient) {
    }

    getAllBlogPosts() {
        console.log('GET 1', this.httpClient);
    }

    createNewBlogPost() {
        console.log('POST 1');
    }
}
