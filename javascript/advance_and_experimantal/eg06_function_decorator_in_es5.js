/*
Javascript function decorators are implemented using "Higher Order Function"
"Higher Order Function" are functions that take in function and/or return a function
in other words A type of function that takes in a function and returns another function
*/

// Decorator Function
function addFreeItemDecorator(fn) {
    return function decorator(name, price, quantity) {
        // fn = is the function passed in addFreeItemDecorator
        // arguments array, (name, price, quantity) = are the arguments passed to fn
        // return = function will be called when setDetail() is called
        // this = is ItemOrder() function/class

        // Line below is an error because... DON'T HAVE CORRECT ANSWER.
        // fn([arguments[0] + " plus 1 free", arguments[1], arguments[2] + 1]);

        fn.apply(this, [name + " plus 1 free", price, quantity + 1]);
        
        console.log("Added free item by addFreeItemDecorator(fn)");
    }
}

// Class definition
function ItemOrder() {}

// Adding functions to Class
ItemOrder.prototype.setDetail = addFreeItemDecorator(function(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
});

ItemOrder.prototype.printDetail = function() {
    console.log(this.name);
    console.log("Price: " + this.price);
    console.log("Quantity: " + this.quantity);
};

// Using Class
var milkOrder = new ItemOrder();
// Setting 1 for quantity but still decorator will modify argument and
// add additional item.
milkOrder.setDetail("Milk", 2, 1);
milkOrder.printDetail();
