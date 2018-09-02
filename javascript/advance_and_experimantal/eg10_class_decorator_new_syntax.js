// ######### Decorators
/*
IMPORTANT: When creating decorators use "function" keyword. Function as es6 function
syntax could produces unexpected results because it changes "this" scope.
*/
let toppingsDecorator = function (initialToppings) {
    return function (PizzaClass) {
        return function (pizzaSize) {
            let modifiedPizza = new PizzaClass(pizzaSize);
            modifiedPizza.toppings = initialToppings;
            /*
            We can also modify Class's functions. e.g.
            modifiedPizza.describe = function() {
                console.log(initialToppings);
            };
            */
            // Even though we are retuning instance of Pizza class but
            // still it will change class definition.
            return modifiedPizza;
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

console.log("Pizza Object = ", pizzaOrder);
console.log("==========");
pizzaOrder.describe();
