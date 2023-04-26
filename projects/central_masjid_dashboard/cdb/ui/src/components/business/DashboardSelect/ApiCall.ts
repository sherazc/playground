

// API Request/Response Types
interface CustomConfiguration {
    name: string;
    value: string;
}

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


/**
 * This method creates all the available endpoints.
 * @param baseUrl
 */
const makeEndpoints = (baseUrl: string) => {
    return {
        createConfigurationEndpoint: (companyId: string) => `${baseUrl}/api/auth/companies/${companyId}/configurations`
    }
}

// This function is only for reference
const apiCentralConfiguration = (companyUrl: string): Promise<CustomConfiguration[]> => {
    const endpoint = `api/companies/${companyUrl}/mh/central-control`;
    console.log("Calling API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

/**
 * This is low level function that will call the javascript HTTP fetch() API.
 *
 * TODO: Change parameters to ApiRequest
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
    return fetch(request.endpoint, requestInit).then(response => response.json());
}


/**
 * Setup all CDB endpoints
 *
 *
 */
const cdbApiUnAuth = (baseUrl: string, commonHeaders?: ApiHeaders, globalCbs?: InterceptorCallBacks) => {

    const endpoints = makeEndpoints(baseUrl);

    // const common:ApiHeaders;
    // if (commonHeaders) {
    //     authTokenHeader.push(["Authorization", `Bearer ${authToken}`])
    // }


    const api = {

        apiCentralConfiguration: (companyId: string): Promise<CustomConfiguration> => {
            // Step 1 Create Endpoint
            const endpoint = endpoints.createConfigurationEndpoint(companyId);

            // Step 2: Create Request
            const request: ApiRequest = {
                endpoint
            }

            // Step 3: Create Promise to call API and decorate it with callbacks
            return createRequestPromise(request, globalCbs);
        }
    }


    return api;
}

const createRequestPromise = (request: ApiRequest, globalCbs?: InterceptorCallBacks): Promise<any> => {
    if (globalCbs && globalCbs.before) {
        globalCbs.before();
    }
    return new Promise((resolve, reject) => {
        let responsePromise = callApi(request);
        responsePromise.then(response => {
            resolve(response);
            if (globalCbs && globalCbs.afterSuccess) {
                globalCbs.afterSuccess(response);
            }
        }, error => {
            reject(error);
            if (globalCbs && globalCbs.afterError) {
                globalCbs.afterError(error);
            }
        })
    });
}


const globalCbs: InterceptorCallBacks = {
    before: () => console.log("Before"),
    afterSuccess: (response) => console.log("After Success ", response),
    afterError: (error) => console.log("After Error", error),
}


let api = cdbApiUnAuth("http://localhost:8085", [], globalCbs);

api.apiCentralConfiguration("5da2632ef2a2337a5fd916d3").then(r => console.log(r));
// api.apiCentralConfiguration("hic").then(r => console.log(r));
