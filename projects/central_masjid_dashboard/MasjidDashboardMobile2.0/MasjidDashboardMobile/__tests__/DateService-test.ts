import { isSameMonthDate, systemTimezoneDate, systemTimezoneIsoString } from "../src/services/DateService";

describe("Compare dates", () => {
    it("isSameMonthDate", () => {

        expect(isSameMonthDate()).toBe(false);
        expect(isSameMonthDate(1)).toBe(false);
        expect(isSameMonthDate(1, 1)).toBe(false);
        expect(isSameMonthDate(1, 1, 1)).toBe(false);
        expect(isSameMonthDate(1, 1, 1, 1)).toBe(true);
    });
});

describe("UTC Dates", () => {

    it("localToUtcDate DLS Dates", () => {

        const date = new Date('2022-04-01T00:00:00-04:00');

        // date.setMinutes(date.getMinutes() - date.getTimezoneOffset())

        // console.log(date)
        // console.log(date.getTimezoneOffset());
        // console.log(date.getHours());
        const dateIsoString = systemTimezoneIsoString(date);
        
        console.log(dateIsoString);
        console.log(systemTimezoneIsoString(date));
        console.log(systemTimezoneDate(date).getHours());

        /* 
        function toIsoString(date: Date) {
            var tzo = -date.getTimezoneOffset(),
                dif = tzo >= 0 ? '+' : '-',
                pad = function (num: number):string {
                    return (num < 10 ? '0' : '') + num;
                };

            return date.getFullYear() +
                '-' + pad(date.getMonth() + 1) +
                '-' + pad(date.getDate()) +
                'T' + pad(date.getHours()) +
                ':' + pad(date.getMinutes()) +
                ':' + pad(date.getSeconds()) +
                dif + pad(Math.floor(Math.abs(tzo) / 60)) +
                ':' + pad(Math.abs(tzo) % 60);
        }

        var dt = new Date();
        console.log(toIsoString(dt));
 */

    });

});

