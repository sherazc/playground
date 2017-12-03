const {addDays, addMinutes, msToTime} = require("../src/services/dateTimeUtils");

describe("dateTimeUtils", () => {
    const date = new Date("2017-11-13T13:34:50");
    describe("addDays", () => {
        it("handle undefined", () => {
            expect(addDays()).toBeUndefined();
            expect(addDays(null)).toBeUndefined();
        });

        it("add 10 days", () => {
            let calcDate = addDays(date, 10);
            expect(calcDate.getFullYear()).toBe(2017);
            expect(calcDate.getMonth()).toBe(10);
            expect(calcDate.getDate()).toBe(23);
        });

        it("subtract 10 days", () => {
            let calcDate = addDays(date, -10);
            expect(calcDate.getFullYear()).toBe(2017);
            expect(calcDate.getMonth()).toBe(10);
            expect(calcDate.getDate()).toBe(3);
        });

        it("add 100 days", () => {
            let calcDate = addDays(date, 100);
            expect(calcDate.getFullYear()).toBe(2018);
            expect(calcDate.getMonth()).toBe(1);
            expect(calcDate.getDate()).toBe(21);
        });

        it("subtract 100 days", () => {
            let calcDate = addDays(date, -100);
            expect(calcDate.getFullYear()).toBe(2017);
            expect(calcDate.getMonth()).toBe(7);
            expect(calcDate.getDate()).toBe(5);
        });
    });

    describe("addMinutes", () => {
        it("handle undefined", () => {
            expect(addMinutes()).toBeUndefined();
            expect(addMinutes(null)).toBeUndefined();
        });

        it("add 10 minutes", () => {
            let calcDate = addMinutes(date, 10);
            expect(calcDate.getHours()).toBe(13);
            expect(calcDate.getMinutes()).toBe(44);
            expect(calcDate.getSeconds()).toBe(50);
        });

        it("subtract 10 minutes", () => {
            let calcDate = addMinutes(date, -10);
            expect(calcDate.getHours()).toBe(13);
            expect(calcDate.getMinutes()).toBe(24);
            expect(calcDate.getSeconds()).toBe(50);
        });

        it("add 100 minutes", () => {
            let calcDate = addMinutes(date, 100);
            expect(calcDate.getHours()).toBe(15);
            expect(calcDate.getMinutes()).toBe(14);
            expect(calcDate.getSeconds()).toBe(50);
        });

        it("subtract 100 minutes", () => {
            let calcDate = addMinutes(date, -100);
            expect(calcDate.getHours()).toBe(11);
            expect(calcDate.getMinutes()).toBe(54);
            expect(calcDate.getSeconds()).toBe(50);
        });
    });

    describe("msToTime", () => {
        it.skip("handle undefined", () => {
            expect(msToTime()).toBeUndefined();
            expect(msToTime(null)).toBeUndefined();
        });

        it.skip("zero duration", () => {
            expect(msToTime(0)).toBe("00:00:00");
        });

        it("seconds duration", () => {
            expect(msToTime(1 * 1000)).toBe("00:00:01");
            expect(msToTime(30 * 1000)).toBe("00:00:30");
            expect(msToTime(100 * 1000)).toBe("00:01:40");
            expect(msToTime(1000 * 1000)).toBe("00:16:40");
        });

        it("minutes duration", () => {
            expect(msToTime(1 * 1000 * 60)).toBe("00:01:00");
            expect(msToTime(30 * 1000 * 60)).toBe("00:30:00");
            expect(msToTime(100 * 1000 * 60)).toBe("01:40:00");
            expect(msToTime(1000 * 1000 * 60)).toBe("16:40:00");
        });
    });
});

