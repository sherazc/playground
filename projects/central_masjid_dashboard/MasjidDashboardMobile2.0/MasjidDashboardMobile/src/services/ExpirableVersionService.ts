
import { ExpirableVersion } from '../types/types';
import { createExpirationDate, nowUtcDate } from './DateService';

export const isExpired = (expirableVersion?: ExpirableVersion) => {
    /*
    console.log("expirableVersion", expirableVersion);
    console.log("expirableVersion.expirationDate.getTime()", expirableVersion.expirationDate);
    console.log("nowUtcDate().getTime()", nowUtcDate());
    console.log("expirableVersion.expirationDate.getTime()", expirableVersion.expirationDate.getTime());
    console.log("nowUtcDate().getTime()", nowUtcDate().getTime());
    console.log("expirableVersion.expirationDate.getTime() < nowUtcDate().getTime()", expirableVersion.expirationDate.getTime() < nowUtcDate().getTime());
*/
    return !expirableVersion
        || !expirableVersion.expirationDate
        || expirableVersion.expirationDate.getTime() < nowUtcDate().getTime();
}

export const createOrRefreshExpirableVersion = (e?: ExpirableVersion) => {
    const result: ExpirableVersion = {version: 0, expirationDate: createExpirationDate()};
    if (e && e.version) {
        result.version = e.version;
    }
    return result;
}