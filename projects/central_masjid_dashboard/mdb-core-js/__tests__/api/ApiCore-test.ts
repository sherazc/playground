// NOTE: Do not shortened this import as recomended by IntelliJ.
// If we do that then it runs sample code in ApiCdb.ts and we have not imported that file.
import {addHeadersInRequest, ApiRequest, callApi, callApiIntercept, InterceptorCallBacks} from "../../src/api/ApiCore";
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
    test("callApi - success 200", (done) => {
        const key = "key";
        const value = "value";

        // @ts-ignore
        const fetchResponse: Response = {
            status: 200,
            json: () => Promise.resolve({key: value})
        };

        jest.spyOn(ApiFetchWrapper, "fetchWrapper")
            .mockImplementation(() => Promise.resolve(fetchResponse));

        let request: ApiRequest = {endpoint: ""};
        callApi(request).then((response) => {
            expect(response[key]).toBe(value);
            done();
        });
    });

    test("callApi - fail 500", (done) => {
        const mockError = "mockError";

        // @ts-ignore
        const fetchResponse: Response = {
            status: 500,
            text: () => Promise.resolve(mockError)
        };

        jest.spyOn(ApiFetchWrapper, "fetchWrapper")
            .mockImplementation(() => Promise.resolve(fetchResponse));

        let request: ApiRequest = {endpoint: ""};
        callApi(request).then(
            () => {},
            (error) => {
                expect(error).toBe(mockError);
                done();
            }
        );
    });
});


describe("ApiCore - callApiIntercept", () => {
    test("callApiIntercept, Success interceptors 200", (done) => {
        // Setup
        let beforeCalled = false;
        let afterSuccessCalled = false;
        let afterErrorCalled = false;
        const key = "key";
        const value = "value";

        // @ts-ignore
        const fetchResponse: Response = {
            status: 200,
            json: () => Promise.resolve({key: value})
        };

        jest.spyOn(ApiFetchWrapper, "fetchWrapper")
            .mockImplementation(() => Promise.resolve(fetchResponse));

        let request: ApiRequest = {endpoint: ""};

        const interceptors: InterceptorCallBacks = {
            before: () => beforeCalled = true,
            afterSuccess: (response) => afterSuccessCalled = true,
            afterError: (error) => afterErrorCalled = true,
        }

        // Call
        callApiIntercept(request, interceptors).then(
            response => {
                // Verify
                expect(beforeCalled).toBeTruthy();
                expect(afterSuccessCalled).toBeTruthy();
                expect(afterErrorCalled).toBeFalsy();
                expect(response[key]).toBe(value);
                done();
            }
        );
    });

    test("callApiIntercept, Success interceptors 500", (done) => {
        // Setup
        let beforeCalled = false;
        let afterSuccessCalled = false;
        let afterErrorCalled = false;
        const mockError = "mockError";

        // @ts-ignore
        const fetchResponse: Response = {
            status: 500,
            text: () => Promise.resolve(mockError)
        };

        jest.spyOn(ApiFetchWrapper, "fetchWrapper")
            .mockImplementation(() => Promise.resolve(fetchResponse));

        let request: ApiRequest = {endpoint: ""};

        const interceptors: InterceptorCallBacks = {
            before: () => beforeCalled = true,
            afterSuccess: (response) => afterSuccessCalled = true,
            afterError: (error) => afterErrorCalled = true,
        }

        // Call
        callApiIntercept(request, interceptors).then(
            () => {},
            error => {
                // Verify
                expect(beforeCalled).toBeTruthy();
                expect(afterSuccessCalled).toBeFalsy();
                expect(afterErrorCalled).toBeTruthy();
                expect(error).toBe(mockError);
                done();
            }
        );
    });

    test("callApiIntercept, Reject/Error fetch interceptors", (done) => {
        // Setup
        let beforeCalled = false;
        let afterSuccessCalled = false;
        let afterErrorCalled = false;
        const mockError = "mockError";

        jest.spyOn(ApiFetchWrapper, "fetchWrapper")
            .mockImplementation(() => Promise.reject(mockError));

        let request: ApiRequest = {endpoint: ""};

        const interceptors: InterceptorCallBacks = {
            before: () => beforeCalled = true,
            afterSuccess: (response) => afterSuccessCalled = true,
            afterError: (error) => afterErrorCalled = true,
        }

        // Call
        callApiIntercept(request, interceptors).then(
            () => {},
            error => {
                // Verify
                expect(beforeCalled).toBeTruthy();
                expect(afterSuccessCalled).toBeFalsy();
                expect(afterErrorCalled).toBeTruthy();
                expect(error).toBe(mockError);
                done();
            }
        );
    });
});
