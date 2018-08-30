// WORK ON THIS EXAMPLE
// ######### Helper

// ######### Decorators
/*
class decorator Can only change implementation of class not the instance.
*/

let toppingsDecorator = function(initialToppings) {
    return function(PizzaClass) {
        return function (pizzaSize) {
            console.log(pizzaSize);
            console.log(PizzaClass);
            let modified = new PizzaClass(pizzaSize);
            modified.describe = function() {
                console.log(initialToppings);
            }
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
