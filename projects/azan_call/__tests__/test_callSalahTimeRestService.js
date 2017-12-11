let Constants = require("../src/services/Constants");
let callSalahTimeRestService = require("../src/services/callSalahTimeRestService");
//require('whatwg-fetch');
// import 'whatwg-fetch';
/*
callSalahTimeRestService(Constants.SERVICE_URL, 
    (salahTimeObject) => {
        done();
    },
    (error) => {
        done();
    }
);
*/

describe.skip("callSalahTimeRestService", () => {
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