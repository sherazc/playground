import { EXPIRATION_MILLIS } from './Constants';

export const createExpirationDate = () => new Date(Date.now() + EXPIRATION_MILLIS);
