let Constants = require("../src/services/Constants");
let callSalahTimeRestService = require("../src/services/callSalahTimeRestService");
let makeFakeSalatTime = require("./fakes/makeFake").makeFakeSalatTime;

describe("callSalahTimeRestService", () => {
    beforeEach(() => {
        global.fetch = jest.fn(mockFetchImpl);
    });
    it("working", (done) => {
        callSalahTimeRestService(Constants.SERVICE_URL, 
            (salahTimeObject) => {
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

        // 
        let response = {
            json: () => JSON.stringify(makeFakeSalatTime())
        }
        resolve(response);
    });
    return fetchPromise;
};