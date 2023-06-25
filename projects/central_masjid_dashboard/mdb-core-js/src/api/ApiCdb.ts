import {CustomConfiguration} from "../types/types";
import {addHeadersInRequest, ApiHeaders, ApiRequest, callApiIntercept, InterceptorCallBacks} from "./ApiCore";

/**
 * This method creates all the available endpoints.
 * @param baseUrl
 */
export const cdbEndpoints = (baseUrl: string) => {
    return {
        createConfigurationEndpoint: (companyId: string) => `${baseUrl}/api/auth/companies/${companyId}/configurations`
    }
}


/**
 * Setup all CDB endpoints
 *
 */
export const cdbApis = (baseUrl: string, commonHeaders?: ApiHeaders, interceptorCbs?: InterceptorCallBacks) => {

    const endpoints = cdbEndpoints(baseUrl);

    const api = {
        apiCentralConfiguration: (companyId: string): Promise<CustomConfiguration> => {
            const endpoint = endpoints.createConfigurationEndpoint(companyId);
            const request: ApiRequest = {endpoint};
            addHeadersInRequest(request, commonHeaders);
            return callApiIntercept(request, interceptorCbs);
        }
    }
    return api;
}


/*

// ############# Reference: Sample Call in application
// Do not use it. This is just for reference and testing
const interceptorCbs: InterceptorCallBacks = {
    before: () => console.log("Before"),
    afterSuccess: (response) => console.log("After Success ", response),
    afterError: (error) => console.log("After Error", error),
}

const headers: ApiHeaders = [
    ["Authorization", "Bearer abc"]
];


// let api = cdbApis("http://localhost:8085", headers, interceptorCbs);
let api = cdbApis("http://localhost:8085", undefined, interceptorCbs);

api.apiCentralConfiguration("5da2632ef2a2337a5fd916d3").then(
    r => console.log("API Success", r),
    e => console.log("API Error", e)
);

*/
