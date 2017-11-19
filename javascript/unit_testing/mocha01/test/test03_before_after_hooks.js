describe('hooks', () = {
    before(() => { console.log("Run before all it()"); });
    after(() => { console.log("Run after all it()"); });
    beforeEach(() => { console.log("Run before every it()"); });
    afterEach(() => { console.log("Run after every it()"); });

    it("Spec A", () => { console.log("Running Spec A"); });
    it("Spec B", () => { console.log("Running Spec B"); });
});