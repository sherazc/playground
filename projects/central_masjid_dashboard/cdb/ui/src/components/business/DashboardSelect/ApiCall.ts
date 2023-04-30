// ############# API core types

// API Setup
type ApiMethod = "GET" | "PUT" | "POST" | "DELETE";
type ApiHeaders = [string, string][];

type ApiRequest = {
    endpoint: string;
    payload?: any;
    method?: ApiMethod;
    headers?: ApiHeaders;
}

type InterceptorCallBacks = {
    before?: Function;
    afterSuccess?: (response?: any) => void;
    afterError?: (error?: any) => void;
}


// ############## API Core service


const addHeadersInRequest = (request: ApiRequest, headers?: ApiHeaders): ApiRequest => {
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
const callApi = (request: ApiRequest): Promise<any> => {
    const requestInit: RequestInit = {
        method: request.method ? request.method : "GET"
    }

    if (request.headers) {
        requestInit.headers = request.headers;
    }

    if (request.payload) {
        if (typeof request.payload === "string") {
            requestInit.body = request.payload
        } else if(request.payload instanceof String) {
            requestInit.body = request.payload.toString();
        } else {
            requestInit.body = JSON.stringify(request.payload);
        }
    }
    return fetch(request.endpoint, requestInit).then(
        response => response.json()
    );
}


const createResponsePromise = (request: ApiRequest, interceptorCbs?: InterceptorCallBacks): Promise<any> => {
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






// ############# API CDB types
// API Request/Response Types
interface CustomConfiguration {
    name: string;
    value: string;
}



// ############# API CDB Service

/**
 * This method creates all the available endpoints.
 * @param baseUrl
 */
const cdbEndpoints = (baseUrl: string) => {
    return {
        createConfigurationEndpoint: (companyId: string) => `${baseUrl}/api/auth/companies/${companyId}/configurations`
    }
}



/**
 * Setup all CDB endpoints
 *
 */
const cdbApis = (baseUrl: string, commonHeaders?: ApiHeaders, interceptorCbs?: InterceptorCallBacks) => {

    const endpoints = cdbEndpoints(baseUrl);

    const api = {

        apiCentralConfiguration: (companyId: string): Promise<CustomConfiguration> => {
            const endpoint = endpoints.createConfigurationEndpoint(companyId);
            const request: ApiRequest = {endpoint};
            addHeadersInRequest(request, commonHeaders);
            return createResponsePromise(request, interceptorCbs);
        }
    }
    return api;
}

// ############# Sample Call in application

const interceptorCbs: InterceptorCallBacks = {
    before: () => console.log("Before"),
    afterSuccess: (response) => console.log("After Success ", response),
    afterError: (error) => console.log("After Error", error),
}

const headers: ApiHeaders = [
    ["Authorization", "Bearer abc"]
];


let api = cdbApis("http://localhost:8085", headers, interceptorCbs);

api.apiCentralConfiguration("5da2632ef2a2337a5fd916d3").then(r => console.log(r));

