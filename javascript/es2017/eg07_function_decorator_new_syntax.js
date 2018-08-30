// WORK ON THIS EXAMPLE
// ######### Helper

// ######### Decorators
let toppingsDecorator = (toppingsArray) => {
    return (PizzaClass) => {
        console.log(PizzaClass);
        return (...args) => {
            // console.log(arguments);
            return new PizzaClass("Small");
        };

    };
};


// ######### Decorating Class
@toppingsDecorator(['a', 'b'])
class Pizza {
    constructor(size) {
        this.size = size;
        this.toppings = [];
    }

    describe() {
        console.log(`${this.size} Pizza`);
        console.log(this.toppings);
        this.toppings.forEach((value) => {console.log(`${value}, `)})
    }
}


// ######### Using decorations
let pizzaOrder1 = new Pizza("Large");

//pizzaOrder1.describe();