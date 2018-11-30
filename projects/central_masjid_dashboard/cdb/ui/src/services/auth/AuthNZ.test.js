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
        expect(verifyAuthorization(createTokenPayload(undefined, ['A', 'B']), ['A', 'B', 'C'], [])).toBeFalsy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['A', 'B', 'C']), ['A'], [])).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['A', 'B', 'C']), ['D'], [])).toBeFalsy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['A']), ['B'], [])).toBeFalsy();
    });

    it("should match any roles", () => {
        expect(verifyAuthorization(createTokenPayload(), undefined, undefined)).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(), [], ['A', 'B', 'C'])).toBeFalsy();
        expect(verifyAuthorization(createTokenPayload(undefined, []), [], ['A', 'B', 'C'])).toBeFalsy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['A']), [], ['A', 'B', 'C'])).toBeTruthy();
    });

    it("should allow SUPER_ADMIN", () => {
        expect(verifyAuthorization(createTokenPayload(undefined, ['SUPER_ADMIN']), undefined, undefined)).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['SUPER_ADMIN']), [], [])).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['SUPER_ADMIN']), ['A'], [])).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['SUPER_ADMIN']), [], ['B'])).toBeTruthy();
        expect(verifyAuthorization(createTokenPayload(undefined, ['SUPER_ADMIN']), ['A'], ['B'])).toBeTruthy();
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