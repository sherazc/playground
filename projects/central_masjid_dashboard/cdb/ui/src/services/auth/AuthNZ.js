export const verifyAuthentication = (tokenPayload, authenticate) => {
    if (authenticate) {
        if (tokenPayload && tokenPayload.exp) {
            return tokenPayload.exp * 1000 > new Date().getTime();
        } else {
            return false;
        }
    } else {
        return true;
    }
};

/*

tokenPayload: {
      sub: 'user@email.com',
      roles: [
        'USER'
      ],
      exp: 1543321908
    },
 */


export const verifyAuthorization = (tokenPayload, rolesAll, rolesAny) => {
    const requireAuthorization = rolesAll || rolesAny;
    const tokenRolesAvailable = tokenPayload && tokenPayload.roles && tokenPayload.roles.length > 0;
    if (requireAuthorization && !tokenRolesAvailable) {
        return false;
    }

    // https://stackoverflow.com/questions/15514907/determining-whether-one-array-contains-the-contents-of-another-array-in-javascri
    // tokenPayload.roles.every()

    // TODO validate if all roles are available in token
    return true;
};

export const decodeTokenPayload = (token) => {
    if(!token) return undefined;

    const tokenParts = token.split('.');

    if(tokenParts.length !== 3) return undefined;

    const jwtPayload = tokenParts[1].replace('-', '+').replace('_', '/');

    return JSON.parse(atob(jwtPayload));
};