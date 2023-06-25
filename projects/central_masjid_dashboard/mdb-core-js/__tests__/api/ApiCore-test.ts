// NOTE: Do not shortened this import as recomended by IntelliJ.
// If we do that then it runs sample code in ApiCdb.ts and we have not imported that file.
import {addHeadersInRequest, ApiRequest, callApi} from "../../src/api/ApiCore";
import * as ApiFetchWrapper from "../../src/api/ApiFetchWrapper";
import {fetchWrapper} from "../../src/api/ApiFetchWrapper";


describe("ApiCore - addHeadersInRequest", () => {

    test("undefined headers", () => {
        let request: ApiRequest = {endpoint: ""};
        addHeadersInRequest(request, undefined);
        expect(request.headers).toBeFalsy();
    });

    test("Empty headers", () => {
        let request: ApiRequest = {endpoint: ""};
        addHeadersInRequest(request, []);
        expect(request.headers).toBeTruthy();
        // @ts-ignore
        expect(request.headers.length).toBe(0);
    });

    test("Add headers", () => {
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


describe("ApiCore - callApi", () => {
    test("callApi", (done) => {

        const key = "key";
        const value = "value";
        // @ts-ignore
        const fetchResponse: Response = {
            status: 200,
            json: () => Promise.resolve({key: value})
        };

        jest.spyOn(ApiFetchWrapper, "fetchWrapper").mockImplementation(() => Promise.resolve(fetchResponse));

        let request: ApiRequest = {endpoint: ""};
        callApi(request).then((response) => {
            expect(response[key]).toBe(value);
            done();
        });
    });
});


