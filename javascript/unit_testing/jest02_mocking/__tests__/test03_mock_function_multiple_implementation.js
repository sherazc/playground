describe("My Mock Application", () => {
    it("mock function", () => {
        let myMockFunction = jest.fn(() => 'Z')
            .mockImplementationOnce(() => 'A')
            .mockImplementationOnce(() => 'B');

        // First call returns "A"
        expect(myMockFunction()).toBe('A');

        // 2nd call returns "B"
        expect(myMockFunction()).toBe('B');

        // Rest of the calls returns default "Z"
        expect(myMockFunction()).toBe('Z');
        expect(myMockFunction()).toBe('Z');
    });
});
