
import { ExpirableVersion } from '../types/types';
import { createExpirationDate } from './DateService';

export const isExpired = (expirableVersion?: ExpirableVersion) => {
    return !expirableVersion
        || !expirableVersion.expirationDate
        || expirableVersion.expirationDate.getTime() < new Date().getTime()
}

export const createOrRefreshExpirableVersion = (e?: ExpirableVersion) => {
    const result: ExpirableVersion = {version: 0, expirationDate: createExpirationDate()};
    if (e && e.version) {
        result.version = e.version;
    }
    return result;
}
