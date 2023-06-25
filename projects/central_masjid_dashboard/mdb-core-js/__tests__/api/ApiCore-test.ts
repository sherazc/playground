import {addHeadersInRequest, ApiRequest} from "../../src";

describe("ApiCore - addHeadersInRequest", () => {

    it("undefined headers", () => {
        let request: ApiRequest = {endpoint: ""};
        addHeadersInRequest(request, undefined);
        expect(request.headers).toBeFalsy();
    });

    it("Empty headers", () => {
        let request: ApiRequest = {endpoint: ""};
        addHeadersInRequest(request, []);
        expect(request.headers).toBeTruthy();
        // @ts-ignore
        expect(request.headers.length).toBe(0);
    });

    it("Add headers", () => {
        let request: ApiRequest = {endpoint: ""};
        const headerName = "Authorization";
        const headerValue = "Bearer a.b.c";
        addHeadersInRequest(request, [[headerName, headerValue]]);
        expect(request.headers).toBeTruthy();
        // @ts-ignore
        expect(request.headers.length).toBe(1);
        // @ts-ignore
        expect(request.headers[0][0]).toBe(headerName);
        // @ts-ignore
        expect(request.headers[0][1]).toBe(headerValue);

    });
});