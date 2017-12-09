const processSalahs = require("../src/services/processSalahs");
const makeFakeSalahs = require("./fakes/makeFake").makeFakeSalahs;
const TODAY_DATE_STR = "2016-02-29";

describe("processSalahs", () => {
    it("be Thruthy", () => {
        let result = processSalahs();
        expect(result).toBeTruthy();
        expect(result.mainMessage).toBeDefined();
        expect(result.subMessage).toBeDefined();
    });

    it("fajar azan not called", () => {
        // Setup
        let fakeSalahs = makeFakeSalahs(TODAY_DATE_STR);
        let now = new Date(TODAY_DATE_STR + "T06:15");
        //console.log(fakeSalahs);
        console.log(now);
        

        // Call
        let result = processSalahs(now, fakeSalahs);
        // Assert
        //expect(result.mainMessage).toBe("Fajar azan not called");


    });
});