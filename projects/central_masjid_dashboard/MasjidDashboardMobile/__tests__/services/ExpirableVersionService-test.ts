import { Constants } from "../../src/services/Constants";
import { MdDate } from "mdb-core-js";
import { createExpirationDate, createExpirationDateIso, createOrRefreshExpirableVersion, isExpired } from "../../src/services/ExpirableVersionService";
import { ExpirableVersion } from "mdb-core-js";


describe("ExpirableVersionService", () => {

    it("createExpirationDate()", () => {
        const expirationDateMilliseconds = createExpirationDate().getTime();
        const tempExpireMilliseconds = new Date().getTime() + Constants.EXPIRATION_MILLIS;
        const plusMinusErrorMilliseconds = 500;

        expect(expirationDateMilliseconds).toBeGreaterThan(tempExpireMilliseconds - plusMinusErrorMilliseconds);
        expect(expirationDateMilliseconds).toBeLessThan(tempExpireMilliseconds + plusMinusErrorMilliseconds);
    });


    it("createExpirationDateIso()", () => {
        const expirationDateIso = createExpirationDateIso();
        const expirationDateMilliseconds = new Date(expirationDateIso).getTime();
        const tempExpireMilliseconds = new Date().getTime() + Constants.EXPIRATION_MILLIS;
        const plusMinusErrorMilliseconds = 500;

        expect(expirationDateMilliseconds).toBeGreaterThan(tempExpireMilliseconds - plusMinusErrorMilliseconds);
        expect(expirationDateMilliseconds).toBeLessThan(tempExpireMilliseconds + plusMinusErrorMilliseconds);

    });


    it("createOrRefreshExpirableVersion() - Create", () => {
        const expirableVersion = createOrRefreshExpirableVersion();
        expect(expirableVersion.version).toBe(0);
        expect(expirableVersion.expirationDate?.isValid).toBeTruthy();

        // @ts-ignore
        expect(expirableVersion.expirationDate?.jsDate.getTime()
            > new Date().getTime()).toBeTruthy();
    });


    it("isExpired() - Expired", () => {
        expect(isExpired()).toBeTruthy();
        expect(isExpired(null)).toBeTruthy();

        const date = new Date();
        date.setSeconds(date.getSeconds() - 1);

        const expVersion: ExpirableVersion = {
            version: 0,
            expirationDate: new MdDate(date)
        }

        expect(isExpired(expVersion)).toBeTruthy();
    });


    it("isExpired() - Not expired", () => {
        const date = new Date();
        date.setSeconds(date.getSeconds() + 1);

        const expVersion: ExpirableVersion = {
            version: 0,
            expirationDate: new MdDate(date)
        }

        expect(isExpired(expVersion)).toBeFalsy();

    });
});