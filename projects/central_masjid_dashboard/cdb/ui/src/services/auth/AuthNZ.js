import {isEntityHasId} from "../utilities";

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

export const loadCompanyFromProps = (props) => {
    let company;
    if (isEntityHasId(props.companyServiceResponse.target)) {
        company = props.companyServiceResponse.target;
    } else if (isEntityHasId(props.login.company)) {
        company = props.login.company;
    }
    return company;
};

export const loadUserFromProps = (props) => {
    let user;
    if (isEntityHasId(props.companyUserServiceResponse.target)) {
        user = props.companyUserServiceResponse.target;
    } else if (isEntityHasId(props.login.user)) {
        user = props.login.user;
    }
    return user;
};

export const isAuthPresent = (login) => {
    return login && login.tokenPayload && verifyAuthentication(login.tokenPayload, true);
};

export const isAdminLogin = (login) => {
    if(!tokenPayloadObjectExist(login)) {
        return false;
    }
    return isAuthPresent(login) && verifyAuthorization(login.tokenPayload, ['ADMIN']);
};

export const isSuperAdminLogin = (login) => {
    if(!tokenPayloadObjectExist(login)) {
        return false;
    }
    return isAuthPresent(login) && verifyAuthorization(login.tokenPayload, ['SUPER_ADMIN']);
};


const tokenPayloadObjectExist = (login) => {
    return login && login.tokenPayload
};

export const isSameUsers = (user1, user2) => {
    if(!user1 || !user2) {
        return false;
    }
    return user1 && user1.id
        && user2 && user2.id
        && user1.id === user2.id;
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