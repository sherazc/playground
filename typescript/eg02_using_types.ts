class Calculator {
    private version: string = "1.0.0";

    public static add(a: number, b: number) : number {
        return a + b;
    }

    public about(): void {
        console.log(this.concat("Calculator Version: ", this.version));
    }

    private concat(a: string, b: string): string {
        return a + b;
    }
}

(function() {
    let calculator: Calculator = new Calculator();
    calculator.about();

    let addResult:number = Calculator.add(2, 3);
    console.log("add(2,3) " + addResult);
})();