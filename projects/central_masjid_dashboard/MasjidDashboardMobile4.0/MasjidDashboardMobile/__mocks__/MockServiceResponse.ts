import { ServiceResponse } from "../src/types/types";

function mockCreateServiceResponse<T>(target: T, successful: boolean):ServiceResponse<T> {
    return {
        successful: successful,
        fieldErrors: [],
        message: "",
        target: target
    };
}

export {mockCreateServiceResponse}