let myObject = {
    colorValue: "red",
    get color() {
        return `Color = ${this.colorValue}`;
    },

    set color(value) {
        this.colorValue = `(${value})`;
    }
};

// NOTE: We don't give parenthesis when using set, get method
console.log(myObject.color);

myObject.color = "green";

console.log(myObject.color);