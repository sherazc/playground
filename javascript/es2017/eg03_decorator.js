// ######### Decorators
let toppings = (pizzaTarget) => {
    pizzaTarget.toppings = [];
};

let extraCheese = (pizzaTarget) => {
    console.log(pizzaTarget.toppings);
    // pizzaTarget.toppings.push("Extra Cheese");
};


// ######### Decorating Class
@toppings
@extraCheese
class Pizza {
    constructor(size) {
        this.size = size;
    }

    describe() {
        console.log(`${this.size} Pizza`);
        // this.toppings.forEach((value, index) => {console.log(`${value}, `)})
    }
}


// ######### Using decorations
let pizzaOrder1 = new Pizza("Large");

pizzaOrder1.describe();
