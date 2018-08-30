// WORK ON THIS EXAMPLE
// ######### Helper

// ######### Decorators
let extraCheese = (pizzaTarget) => {
    pizzaTarget.toppings = ["Extra Cheese"];
};


// ######### Decorating Class
@extraCheese
class Pizza {
    constructor() {
        this.size = "";
        this.toppings = [];
    }

    describe() {
        console.log(`${this.size} Pizza`);
        console.log(this.toppings);
        this.toppings.forEach((value) => {console.log(`${value}, `)})
    }


}


// ######### Using decorations
let pizzaOrder1 = new Pizza();

pizzaOrder1.describe();

console.log(Pizza.toppings);