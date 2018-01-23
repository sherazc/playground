import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_ENDPOINT } from '../myConfigs';

@Injectable()
export class BlogService {
    constructor(private httpClient: HttpClient, @Inject(SERVICE_ENDPOINT) private serviceEndpoint: string) {}

    getAllBlogPosts() {
        console.log(this.serviceEndpoint);
        console.log('GET 1', this.httpClient);
    }

    createNewBlogPost() {
        console.log('POST 1');
    }
}
