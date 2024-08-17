import {fetchWrapper} from "./ApiFetchWrapper";

export type ApiMethod = "GET" | "PUT" | "POST" | "DELETE";
export type ApiHeaders = [string, string][];

export type ApiRequest = {
    endpoint: string;
    payload?: any;
    method?: ApiMethod;
    headers?: ApiHeaders;
}

export type InterceptorCallBacks = {
    before?: Function;
    afterSuccess?: (response?: any) => void;
    afterError?: (error?: any) => void;
}


// ############## API Core service


export const addHeadersInRequest = (request: ApiRequest, headers?: ApiHeaders): ApiRequest => {
    if (headers) {
        if (!request.headers) {
            request.headers = [];
        }
        headers.forEach(h => request.headers?.push(h));
    }
    return request;
}

/**
 * This is low level function that will call the javascript HTTP fetch() API.
 *
 */
export const callApi = (request: ApiRequest): Promise<any> => {
    const requestInit: RequestInit = {
        method: request.method ? request.method : "GET"
    }

    if (request.headers) {
        requestInit.headers = request.headers;
    }

    if (request.payload) {
        if (typeof request.payload === "string") {
            requestInit.body = request.payload
        } else if (request.payload instanceof String) {
            requestInit.body = request.payload.toString();
        } else {
            requestInit.body = JSON.stringify(request.payload);
        }
    }

    const responsePromise: Promise<Response> = fetchWrapper(request.endpoint, requestInit);
    return new Promise((resolve, reject) => {
        responsePromise.then(response => {
            if (response.status === 200) {
                response.json().then(responseJson => {
                    resolve(responseJson);
                }, (error) => reject(error));
            } else {
                response.text().then(responseText => {
                    reject(responseText)
                }, (error) => reject(error));
            }
        }, (error) => {
            if (error instanceof String || typeof error === "string") {
                reject(error);
            } else {
                if (error) {
                    reject(JSON.stringify(error));
                } else {
                    reject();
                }
            }
        });
    });
}


/**
 * This is low level function that will call the javascript HTTP fetch() API.
 * And surround fetch with intercept methods
 *
 */
export const callApiIntercept = (request: ApiRequest, interceptorCbs?: InterceptorCallBacks): Promise<any> => {
    if (interceptorCbs && interceptorCbs.before) {
        interceptorCbs.before();
    }
    return new Promise((resolve, reject) => {
        let responsePromise = callApi(request);
        responsePromise.then(response => {
            resolve(response);
            if (interceptorCbs && interceptorCbs.afterSuccess) {
                interceptorCbs.afterSuccess(response);
            }
        }, error => {
            reject(error);
            if (interceptorCbs && interceptorCbs.afterError) {
                interceptorCbs.afterError(error);
            }
        })
    });
}
