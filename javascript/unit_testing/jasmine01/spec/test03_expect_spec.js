class Calculator {
    add(a, b) {
        return a + b;
    }
}

describe("Calculator Class", () => {
    let calculator = new Calculator();
    it("can expect", () => {
        // Value check
        expect(calculator.add(1,1)).toBe(2); // toBe() is same as ===
        expect(calculator.add(1,1)).toEqual(2); // toEqual() is for deep check
        expect(calculator.add(1,1)).toBeLessThan(3);
        expect(calculator.add(1,1)).toBeGreaterThan(1);
        
        expect(calculator.add(1,1)).not.toBe(0);
        expect(calculator.add(1,1)).not.toEqual(0); 
        expect(calculator.add(1,1)).not.toBeLessThan(0);
        expect(calculator.add(1,1)).not.toBeGreaterThan(4);
        
        // Variable defined check
        expect(calculator).toBeDefined();
        expect(calculator).not.toBeUndefined();
        expect(calculator).not.toBeNull();
        
        // String check
        let message = "My name is Sheraz.";
        let words = ["abc", "def", "ghi"];
        expect(message).toMatch("Sheraz"); // Checks if string contains string
        expect(message).toMatch(/Sheraz/); // Checks if string contains regular expression
        expect(message).toContains("Sheraz"); // Checks if string contains string
        expect(words).toContains("def"); // Checks if array contains value
    });
});