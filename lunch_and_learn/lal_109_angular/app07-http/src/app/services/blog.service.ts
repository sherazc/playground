import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_ENDPOINT } from '../myConfigs';

@Injectable()
export class BlogService {
    constructor(private httpClient: HttpClient, @Inject(SERVICE_ENDPOINT) private serviceEndpoint: string) {}

    async getAllBlogPosts() {
      let result: any = null;
      try {
        result = await this.httpClient.get(this.serviceEndpoint).toPromise();
      } catch (error) {
        console.error(`Unable to get data from ${this.serviceEndpoint}`, error);
      }
      return result;
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
