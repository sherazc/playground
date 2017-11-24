describe("My Mock Application", () => {
    it("mock function", () => {
        // Create mock function and have it return a value
        let myMockFunction = jest.fn(() => "Hello Sheraz Chaudhry");
        
        // Running mock function
        let result = myMockFunction("Sheraz", "Chaudhry");

        // Verifying return value of mock function
        expect(result).toBe("Hello Sheraz Chaudhry");

        // Verify how many times mock function was called
        // calls is a 2 dimentional array [number of mock function called][arguments[]]
        expect(myMockFunction.mock.calls.length).toBe(1);
        
        // Verify first argument to be "Sheraz" of first call
        expect(myMockFunction.mock.calls[0][0]).toBe("Sheraz");

        // Verify second argument to be 20 of first call
        expect(myMockFunction.mock.calls[0][1]).toBe("Chaudhry");
    });
});
