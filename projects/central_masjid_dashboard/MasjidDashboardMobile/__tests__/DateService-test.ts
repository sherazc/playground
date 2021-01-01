// TODO: Go through this tutorial
// https://medium.com/@jan.hesters/3-easy-steps-to-set-up-react-native-with-typescript-jest-and-enzyme-592ca042262f

import { addMinutesToTime, addMinutes } from "../src/services/DateService";


describe("DateService", () => {
    it("addMinutes plus 10 minutes",  () => {
        const date = new Date(2020, 0, 1, 23, 50, 0, 0);
        const calculatedDate = addMinutes(date, 10);
        expect(calculatedDate?.getHours()).toBe(0)
        expect(calculatedDate?.getMinutes()).toBe(0)
    });

    it("addMinutes minus 10 minutes",  () => {
        const date = new Date(2020, 0, 1, 23, 50, 0, 0);
        const calculatedDate = addMinutes(date, -10);
        expect(calculatedDate?.getHours()).toBe(23)
        expect(calculatedDate?.getMinutes()).toBe(40)
    });


    it("addMinutesToTime", () => {
        expect(addMinutesToTime("06:00", 10)).toBe("06:10");
        expect(addMinutesToTime("06:00", -10)).toBe("05:50");
        expect(addMinutesToTime("23:57", 30)).toBe("00:27");
        expect(addMinutesToTime("00:00", 1440)).toBe("00:00");
        expect(addMinutesToTime("00:00", -1440)).toBe("00:00");
        expect(addMinutesToTime("00:00", -1441)).toBe("23:59");
        expect(addMinutesToTime("14:40", -1439)).toBe("14:41");
        expect(addMinutesToTime("18:30", 1439)).toBe("18:29");
    });

})

