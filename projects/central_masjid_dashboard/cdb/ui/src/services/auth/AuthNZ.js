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




/*

login: {
    successful: true,
    token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi51c2VyQGVtYWlsLmNvbSIsInJvbGVzIjpbIkFETUlOIiwiVVNFUiJdLCJleHAiOjE1NDcyNDg1MzN9.1AMgtavXtpY7NOCRzTl903ieTiWeN37_RSX0Qtn6uBY7Cy8YEbBY4ahww51CeGNZol_oDT8ZaEufbO5w8wmvNA',
    tokenPayload: {
      sub: 'admin.user@email.com',
      roles: [
        'ADMIN',
        'USER'
      ],
      exp: 1547248533
    },
    user: {
      id: '5c21c6bf77ee122127010848',
      companyId: 'company1',
      email: 'admin.user@email.com',
      firstName: 'Sheraz',
      lastName: 'Admin',
      roles: [
        'ADMIN',
        'USER'
      ],
      active: true,
      verified: true
    },
    company: {
      id: 'company1',
      name: 'Company Name 1',
      address: {
        street: '123 St',
        city: 'City',
        state: 'GA',
        zip: '12345',
        longitude: '1.1',
        latitude: '2.2'
      },
      active: true,
      expirationDate: '2018-12-25T05:57:19.381+0000'
    }
  }
*/


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