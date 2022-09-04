import { processPrayerTime } from "../../src/services/PrayerTimeProcessor";
import { Prayer } from "../../src/types/types";
import { mockCreatePrayer } from "../../__mocks__/MockTypes";

describe("PrayerTimeProcessor", () => {

    it("processPrayerTime()", () => {
        const prayer = mockCreatePrayer();
        const prayerTimeSummary = processPrayerTime(prayer);
        console.log(prayerTimeSummary);

    });
});