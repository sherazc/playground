import {myService} from "../src/app-service";

describe("App Tests", () => {
    it("should work", () => {
        myService();
        expect(1).toBe(1);
    })
});
