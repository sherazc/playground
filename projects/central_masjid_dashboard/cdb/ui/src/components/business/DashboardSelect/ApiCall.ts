


export interface CustomConfiguration {
    name: string;
    value: string;
}


const makeEndpoints = (baseUrl: string) => {
    return {
        createConfigurationEndpoint: (companyId: string) => `${baseUrl}/api/auth/companies/${companyId}/configurations`
    }
}

const apiCentralConfiguration = (companyUrl: string): Promise<CustomConfiguration[]> => {
    const endpoint = `api/companies/${companyUrl}/mh/central-control`;
    console.log("Calling API ", endpoint);
    return fetch(endpoint).then(response => response.json());
}

type ApiMethod = "GET" | "PUT" | "POST" | "DELETE";
type ApiHeaders = [string, string][];

const callJsonApi = (endpoint: string, payload?: any, apiMethod?: ApiMethod, headers?: ApiHeaders): Promise<any> => {
    const requestInit: RequestInit = {
        method: apiMethod ? apiMethod : "GET"
    }

    if (headers) {
        requestInit.headers = headers;
    }

    if (payload) {
        if (typeof payload === "string") {
            requestInit.body = payload
        } else if(payload instanceof String) {
            requestInit.body = payload.toString();
        } else {
            requestInit.body = JSON.stringify(payload);
        }
    }

    return fetch(endpoint, requestInit).then(response => response.json());
}

// const interceptorCall = (before: Function, after: Function, process: Function, )

const addInterception = (func: Function, before?: Function, after?: Function) => {
    return (...args: any[]) => {
        if (before) {
            before();
        }
        func(...args);
        if (after) {
            after();
        }
    }
}


const cdbApiUnAuth = (baseUrl: string, headers?: ApiHeaders, globalBeforeCb?: Function, globalAfterCb?: Function) => {

    const endpoints = makeEndpoints(baseUrl);



    const api = {
        globalBeforeCb,
        globalAfterCb,
        abc: (companyId: string) => addInterception(() => {
            let endpoint = endpoints.createConfigurationEndpoint(companyId);
            console.log(endpoint);

        }, globalBeforeCb, globalAfterCb)(),

        apiCentralConfiguration: (companyUrl: string) => {
            if (globalBeforeCb) {
                globalBeforeCb.apply(this);
            }
            const endpoint = endpoints.createConfigurationEndpoint(companyUrl);
            console.log("Calling API ", endpoint);
            let responsePromise = callJsonApi(endpoint);
            if (globalAfterCb) {
                globalAfterCb.apply(this);
            }
            return responsePromise;
        }
    }


    return api;
}


let api = cdbApiUnAuth("http://localhost:8085", [], () => console.log("Before"), () => console.log("After"));



api.abc("hic")
