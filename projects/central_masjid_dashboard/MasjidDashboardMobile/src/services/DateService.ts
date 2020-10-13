import { EXPIRATION_MILLIS } from './Constants';

export const createExpirationDate = () => new Date(Date.now() + EXPIRATION_MILLIS);
export const todaysDay = () => (new Date()).getDate();
export const todaysMonth = () => (new Date()).getMonth() + 1;
