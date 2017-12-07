let makeSalahObject = require("../src/services/commonUtils").makeSalahObject;

describe("makeSalahObject function", () => {
    it("make salah object", () => {
        let salahName = "salah name";
        let azanTime = new Date("2016-02-29T12:15:45");
        let iqmahTime = new Date("2016-02-29T12:30:30");

        let salahObject = makeSalahObject(salahName, azanTime, iqmahTime);

        expect(salahObject.name).toBe(salahName);
        expect(salahObject.azan).toBe(azanTime);
        expect(salahObject.iqmah).toBe(iqmahTime);
    });
});