describe("Before After", () => {
    beforeAll(() => {console.log("Run before all it()");});
    
    afterAll(() => {console.log("Run after all it()");});
    
    beforeEach(() => {console.log("Run before every it()");});
    
    afterEach(() => {console.log("Run after every it()");});

    it("Spec A", () => {console.log("Running Spec A");});
    
    it("Spec B", () => {console.log("Running Spec B");});
});