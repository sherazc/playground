export const verifyAuthentication = (token, authenticate) => {
    if (authenticate) {
        // TODO validate token expiration milliseconds.
        return token;
    } else {
        return true;
    }
};


export const verifyAuthorization = (token, roles) => {
    // TODO validate if all roles are available in token
    return true;
};

export const decodeTokenPayload = () => {

};