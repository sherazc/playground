// ######### Decorators
/*
Class decorator can only change implementation of class not the instance.

IMPORTANT: When creating decorators use "function" keyword function
as es6 produces unexpected results because it changes "this" scope.
*/

let toppingsDecorator = (initialToppings) => {
    return (PizzaClass) => {
        return function (pizzaSize) {
            console.log(pizzaSize);
            console.log(PizzaClass);
            let modified = new PizzaClass(pizzaSize);
            modified.describe = () => {
                console.log(initialToppings);
            };
            // Even though we are retuning instance of Pizza class but still it will
            // change class definition.
            return modified;
        }
    }
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

console.log(pizzaOrder1);
console.log("==========");
pizzaOrder1.describe();
