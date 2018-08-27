/*
NOTE: @Decorators are currently in proposal phase.
This is why we are using these bable plugins
    - "@babel/plugin-proposal-class-properties"
    - "@babel/plugin-proposal-decorators"

Once they are finalized they will become part of "env" preset
*/

// Decorator
function addFreeItemDecorator(target, name, descriptor) {
    // target = function's class
    // name = function name on which decorator is added
    // descriptor = function + other function meta data
    // descriptor.value = setDetail function 


    // In ES5 we used to return function from decorator function
    // In new syntax we set it to descriptor.value

    let original = descriptor.value;
    descriptor.value = function (name, price, quantity) {

        // NOTE: FOR SOME REASON BELOW LINE IS ERROR. I DON'T UNDERSTAND WHY!!!
        // descriptor.value.apply(this, [name + " plus 1 free", price, quantity + 1]);

        original.apply(this, [name + " plus 1 free", price, quantity + 1]);
        console.log("Added free item by addFreeItemDecorator()");
    }

    return descriptor;
}

// Class definition
class ItemOrder {

    @addFreeItemDecorator
    setDetail(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    printDetail = function () {
        console.log(this.name);
        console.log("Price: " + this.price);
        console.log("Quantity: " + this.quantity);
    }
}

// Using Class
var milkOrder = new ItemOrder();
milkOrder.setDetail("Milk", 2, 1);
milkOrder.printDetail();
