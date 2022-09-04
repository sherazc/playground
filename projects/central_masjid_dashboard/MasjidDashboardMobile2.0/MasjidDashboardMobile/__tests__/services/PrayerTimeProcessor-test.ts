import { processPrayerTime } from "../../src/services/PrayerTimeProcessor";
import { Prayer } from "../../src/types/types";

describe("PrayerTimeProcessor", () => {

    it("processPrayerTime()", () => {
        processPrayerTime({} as Prayer);
    });
});