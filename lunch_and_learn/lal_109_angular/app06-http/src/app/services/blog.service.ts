import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_ENDPOINT } from '../myConfigs';

@Injectable()
export class BlogService {
    constructor(private httpClient: HttpClient, @Inject(SERVICE_ENDPOINT) private serviceEndpoint: string) {}

    getAllBlogPosts() {
        console.log(this.serviceEndpoint);
        console.log('GET 1', this.httpClient);
        this.httpClient.get(this.serviceEndpoint).subscribe(data => {
            console.log(data);
        });
    }

    createNewBlogPost() {
        const myPost = JSON.parse(`
            {
                "userId": 1,
                "id": 102,
                "title": "Post Title",
                "body": "Post Body"
            }
        `);
        this.httpClient.post(this.serviceEndpoint, myPost).subscribe(data => {
            console.log(data);
        });
    }
}
