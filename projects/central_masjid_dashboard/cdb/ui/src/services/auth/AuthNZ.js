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

export const isAuthPresent = (login) => {
    return login && login.tokenPayload && verifyAuthentication(login.tokenPayload, true);
};

export const isAdminLogin = (props) => {
    if(!tokenPayloadObjectExist(props)) {
        return false;
    }
    return isAuthPresent(props.login) && verifyAuthorization(props.login.tokenPayload, ['ADMIN']);
};

export const isSuperAdminLogin = (props) => {
    if(!tokenPayloadObjectExist(props)) {
        return false;
    }
    return isAuthPresent(props.login) && verifyAuthorization(props.login.tokenPayload, ['SUPER_ADMIN']);
};


const tokenPayloadObjectExist = (props) => {
    return props && props.login && props.login.tokenPayload
};

export const isMyProfile = (props) => {
    if(!props || !props.login || !props.login.user || !props.companyUserServiceResponse) {
        return false;
    }
    const loginInUser = props.login.user;
    const companyUserServiceResponse = props.companyUserServiceResponse.target;
    return loginInUser
        && loginInUser.id
        && companyUserServiceResponse
        && companyUserServiceResponse.id
        && loginInUser.id === companyUserServiceResponse.id;
};

export const verifyAuthorization = (tokenPayload, rolesAll, rolesAny) => {
    const requireAuthorization = (rolesAll && rolesAll.length > 0) || (rolesAny && rolesAny.length > 0);
    const tokenRolesAvailable = tokenPayload && tokenPayload.roles && tokenPayload.roles.length > 0;
    if (tokenRolesAvailable && tokenPayload.roles.indexOf("SUPER_ADMIN") > -1) {
        return true;
    }
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