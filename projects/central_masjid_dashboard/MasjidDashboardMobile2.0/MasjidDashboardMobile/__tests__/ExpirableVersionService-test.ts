import { Constants } from "../src/services/Constants";
import { getSystemTimezoneDateIsoString, MdDate } from "../src/services/DateService";
import { createExpirationDate, createExpirationDateIso, createOrRefreshExpirableVersion, isExpired } from "../src/services/ExpirableVersionService";
import { ExpirableVersion } from "../src/types/types";


describe("ExpirableVersionService", () => {

    it("createExpirationDateIso()", () => {
        const expirationDateIso = createExpirationDateIso();
        const expirationDateMilliseconds = new Date(expirationDateIso).getTime();
        const tempExpireMilliseconds = new Date().getTime() + Constants.EXPIRATION_MILLIS;
        const plusMinusErrorMilliseconds = 500;

        expect(expirationDateMilliseconds).toBeGreaterThan(tempExpireMilliseconds - plusMinusErrorMilliseconds);
        expect(expirationDateMilliseconds).toBeLessThan(tempExpireMilliseconds + plusMinusErrorMilliseconds);

    });

    it("createExpirationDate()", () => {
        const expirationDateMilliseconds = createExpirationDate().getTime();
        const tempExpireMilliseconds = new Date().getTime() + Constants.EXPIRATION_MILLIS;
        const plusMinusErrorMilliseconds = 500;

        expect(expirationDateMilliseconds).toBeGreaterThan(tempExpireMilliseconds - plusMinusErrorMilliseconds);
        expect(expirationDateMilliseconds).toBeLessThan(tempExpireMilliseconds + plusMinusErrorMilliseconds);
    });

    it("Create", () => {
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
        const expVersion:ExpirableVersion = {
            version: 0,
            expirationDate: MdDate.currentSystemMdDate()
        }
    });


    /* 
        it("isExpired()", () => {
            // Setup
            const date = new Date();
            date.setSeconds(date.getSeconds() + 1);
            const dateIso = getSystemTimezoneDateIsoString(date);
            console.log(dateIso)
            const expirableVersion: ExpirableVersion = {
                expirationDate: dateIso
            }
    
            expect(isExpired(expirableVersion)).toBeFalsy();
    
    
            
        }); */
});