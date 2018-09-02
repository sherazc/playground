// ######### Decorators
/*
Class decorator can only change implementation of class not the instance.

IMPORTANT: When creating decorators use "function" keyword function as es6 function
syntax could produces unexpected results because it changes "this" scope.
*/

let toppingsDecorator = function (initialToppings) {
    return function (PizzaClass) {
        return function (pizzaSize) {
            let modified = new PizzaClass(pizzaSize);
            modified.toppings = initialToppings;
            /*
            modified.describe = function() {
                console.log(initialToppings);
            };
            */
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
        console.log("Toppings:");
        this.toppings.forEach((value) => {console.log(`${value}, `)})
    }
}

// ######### Using decorations
let pizzaOrder = new Pizza("Large");

console.log(pizzaOrder);
console.log("==========");
pizzaOrder.describe();
