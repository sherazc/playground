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
    const requireAuthorization = (rolesAll && rolesAll.length > 0) || (rolesAny && rolesAny.length > 0);
    const tokenRolesAvailable = tokenPayload && tokenPayload.roles && tokenPayload.roles.length > 0;
    if (requireAuthorization && !tokenRolesAvailable) {
        return false;
    }

    let result = true;
    if (rolesAll && rolesAll.length > 0) {
        result = rolesAll.every(role => tokenPayload.roles.indexOf(role) > -1);
    }

    if (result && rolesAny && rolesAny.length > 0) {
        result = rolesAny.some(role => tokenPayload.roles.indexOf(role) > -1);
    }

    return result;
};

export const decodeTokenPayload = (token) => {
    if(!token) return undefined;

    const tokenParts = token.split('.');

    if(tokenParts.length !== 3) return undefined;

    const jwtPayload = tokenParts[1].replace('-', '+').replace('_', '/');

    return JSON.parse(atob(jwtPayload));
};