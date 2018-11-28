import {verifyAuthorization} from "./AuthNZ";

describe("AuthNZ verifyAuthorization()", () => {
    it("should take undefined arguments", () => {
        expect(verifyAuthorization()).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, []))).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['A']))).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['A']), null, null)).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['A']), [], [])).toBeTruthy();
    });
    
    it("should match all roles", () => {
        expect(verifyAuthorization(createTokenPayload(undefined, []), [], [])).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['A']), [], [])).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, []), ['A'], [])).toBeFalsy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['A', 'B', 'C']), ['C', 'B', 'A'], [])).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['A', 'B', 'C']), ['A'], [])).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['A', 'B', 'C']), ['D'], [])).toBeFalsy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['A']), ['B'], [])).toBeFalsy();
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