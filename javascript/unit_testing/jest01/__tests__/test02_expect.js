test("Expect Should", () => {
    // Strict equality. Similar to === 
    expect(2 + 2).toBe(4);
    expect(2 + 2).not.toBe(5);

    // Deep equality
    expect({fName: "Sheraz", salary: 100})
        .toEqual({fName: "Sheraz", salary: 100});
    
    // Truthiness
    expect(undefined).toBeUndefined();
    expect(null).toBeNull();
    expect("abc").toBeTruthy();
    expect(1).toBeTruthy();
    expect(true).toBeTruthy();

    expect(undefined).toBeFalsy();
    expect(0).toBeFalsy();
    expect(false).toBeFalsy();

    // Numbers comparision
    expect(4).toBeGreaterThan(3);
    expect(4).toBeGreaterThanOrEqual(3.5);
    expect(4).toBeLessThan(5);
    expect(4).toBeLessThanOrEqual(4.5);

    const value = 0.1 + 0.2;
    // expect(value).toBe(0.3); // This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.

    // String
    expect('Sheraz').not.toMatch(/I/);
    expect('Sheraz').toMatch(/er/);

    // Array
    const names = ["Sheraz", "Tariq", "Chaudhry"];
    expect(names).toContain("Tariq");
    
    let willThrowFunction = () => {
        throw "willThrowFunction() Exception";
    }

    // Exception
    expect(willThrowFunction).toThrow();
    expect(willThrowFunction).toThrow(""); // Check typeof exception
    expect(willThrowFunction).toThrow("willThrowFunction() Exception");
});