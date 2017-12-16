let Constants = require("../src/services/Constants");
let callSalahTimeRestService = require("../src/services/callSalahTimeRestService");
let makeFakeSalatTime = require("./fakes/makeFake").makeFakeSalatTime;

describe.skip("callSalahTimeRestService", () => {
    beforeEach(() => {
        global.fetch = jest.fn(mockFetchImpl);
    });
    it("working", (done) => {
        callSalahTimeRestService(Constants.SERVICE_URL, 
            (salahTimeObject) => {
                expect(salahTimeObject).toBeTruthy();
                expect(salahTimeObject.prayer_date).toBeTruthy();
                expect(salahTimeObject.fajr_athan).toBeTruthy();
                expect(salahTimeObject.fajr_iqama).toBeTruthy();
                expect(salahTimeObject.thuhr_athan).toBeTruthy();
                expect(salahTimeObject.thuhr_iqama).toBeTruthy();
                expect(salahTimeObject.asr_athan).toBeTruthy();
                expect(salahTimeObject.asr_iqama).toBeTruthy();
                expect(salahTimeObject.maghrib_athan).toBeTruthy();
                expect(salahTimeObject.maghrib_iqama).toBeTruthy();
                expect(salahTimeObject.isha_athan).toBeTruthy();
                expect(salahTimeObject.isha_iqama).toBeTruthy();
                expect(salahTimeObject.shurooq).toBeTruthy();
                done();
            },
            (error) => {
                done();
            }
        );
    })
});

let mockFetchImpl = () => {
    let fetchPromise = new Promise((resolve, reject) => {
        resolve(makeFakeSalatTime());
    });
    return fetchPromise;
};