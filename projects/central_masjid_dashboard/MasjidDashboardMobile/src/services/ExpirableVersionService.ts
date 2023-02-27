
import { ExpirableVersion } from "mdb-core-js";
import { Constants } from './Constants';
import { getCurrentSystemDate, getSystemTimezoneDateIsoString, MdDate } from "mdb-core-js";


export const createExpirationDate = () => new Date(createExpirationDateIso());


export const createExpirationDateIso = (): string => {

    const date = getCurrentSystemDate();
    date.setTime(date.getTime() + Constants.EXPIRATION_MILLIS);
    return getSystemTimezoneDateIsoString(date);
};


export const isExpired = (expirableVersion?: (ExpirableVersion | null)) => {
    return !expirableVersion
        || !expirableVersion.expirationDate
        || expirableVersion.expirationDate.jsDate.getTime() < getCurrentSystemDate().getTime();
}


export const createOrRefreshExpirableVersion = (e?: ExpirableVersion) => {
    const result: ExpirableVersion = {version: 0, expirationDate: new MdDate(createExpirationDate())};
    if (e && e.version) {
        result.version = e.version;
    }
    return result;
}
