import { ServiceResponse } from "mdb-core-js";

function mockCreateServiceResponse<T>(target: T, successful: boolean):ServiceResponse<T> {
    return {
        successful: successful,
        fieldErrors: [],
        message: "",
        target: target
    };
}

export {mockCreateServiceResponse}