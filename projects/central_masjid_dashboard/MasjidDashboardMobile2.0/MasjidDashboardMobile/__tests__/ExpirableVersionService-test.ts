import { getSystemTimezoneDateIsoString } from "../src/services/DateService";
import { isExpired } from "../src/services/ExpirableVersionService";
import { ExpirableVersion } from "../src/types/types";

describe("ExpirableVersionService", () => {

    it("isExpired() - invalid arguments", () => {
        expect(isExpired()).toBeTruthy();
        expect(isExpired(null)).toBeTruthy();
        
        
    });

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


        
    });
});