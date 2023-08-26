import {CentralControlCompany, CustomConfiguration, Hadith, ReminderDetail} from "../types/types";
import {addHeadersInRequest, ApiHeaders, ApiRequest, callApiIntercept, InterceptorCallBacks} from "./ApiCore";
import {promiseParseObjectsIsoDateToMdDate} from "../services/DateService";

/**
 * This method creates all the available endpoints.
 * @param baseUrl
 */
export const cdbEndpoints = (baseUrl: string) => {
    return {
        epConfigurations: (companyId: string) => `${baseUrl}/api/auth/companies/${companyId}/configurations`,
        epRod: () => `${baseUrl}/api/rod`,
        epHod: () => `${baseUrl}/api/hod`,
        epCentralControl: (companyUrl: string) => `${baseUrl}/api/companies/url/${companyUrl}/central-control`,
    }
}


/**
 * Setup all CDB endpoints
 *
 */
export const cdbApis = (baseUrl: string, commonHeaders?: ApiHeaders, interceptorCbs?: InterceptorCallBacks) => {

    const endpoints = cdbEndpoints(baseUrl);

    const api = {
        apiConfigurations: (companyId: string): Promise<CustomConfiguration> => {
            const endpoint = endpoints.epConfigurations(companyId);
            const request: ApiRequest = {endpoint};
            addHeadersInRequest(request, commonHeaders);
            return callApiIntercept(request, interceptorCbs);
        },
        apiRod: (): Promise<ReminderDetail> => promiseParseObjectsIsoDateToMdDate(
            callApiIntercept({endpoint: endpoints.epRod()}, interceptorCbs)),
        apiHod: (): Promise<Hadith> => callApiIntercept({endpoint: endpoints.epHod()}, interceptorCbs),
        apiCentralControl: (companyUrl: string): Promise<CentralControlCompany> => callApiIntercept({endpoint: endpoints.epCentralControl(companyUrl)}, interceptorCbs),
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

api.apiConfigurations("5da2632ef2a2337a5fd916d3").then(
    (r: CustomConfiguration) => console.log("apiConfigurations", r),
    e => console.log("API Error", e)
);


api.apiRod().then(
    (r: ReminderDetail) => {
        console.log("apiRod", r)
        console.log("JS Date", r.ayaDetail.date.jsDate);
        console.log("ISO Date", r.ayaDetail.date.isoDate);
    },
    e => console.log("API Error", e)
);

api.apiHod().then((r: Hadith) => console.log("apiHod", r));
*/