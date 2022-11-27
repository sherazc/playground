import { debounceFunction } from "../src/Debounce";

describe("d1", () => {

    test("debounce", () => {
        debounceFunction(() => {
            console.log("Hi")
        })
    });
});