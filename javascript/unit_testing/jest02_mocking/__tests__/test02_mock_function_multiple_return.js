describe("My Mock Application", () => {
    it("mock function", () => {
        let myMockFunction = jest.fn()
            .mockReturnValueOnce(10)
            .mockReturnValueOnce('abc')
            .mockReturnValue(true);
        
        // First call returns 10
        expect(myMockFunction()).toBe(10);
        
        // 2nd call returns "abc"
        expect(myMockFunction()).toBe("abc");

        // Rest of the calls returns default true
        expect(myMockFunction()).toBe(true);
        expect(myMockFunction()).toBe(true);
    });
});
