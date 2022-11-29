import { debounce } from "../src/Debounce";

describe("d1", () => {

    test("debounce", () => {
        debounce(() => {
            console.log("Hi")
        })
    });
});