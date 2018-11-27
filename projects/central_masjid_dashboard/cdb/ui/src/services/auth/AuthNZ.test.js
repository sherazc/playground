import {verifyAuthorization} from "./AuthNZ";

describe("AuthNZ verifyAuthorization()", () => {
    it("should take undefined arguments", () => {
        expect(verifyAuthorization()).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, []))).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, ["USER"]))).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, ["USER"]), null, null)).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, ["USER"]), [], [])).toBeTruthy();
    });
});

const createTokenPayload = (subject, roles, exp) => {
    const tokenPayload = {};
    if (subject) {
        tokenPayload.subject = subject;
    }

    if (roles) {
        tokenPayload.roles = roles;
    }

    if (exp) {
        tokenPayload.exp = exp;
    }
    return tokenPayload;
};