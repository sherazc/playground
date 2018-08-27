/*
Javascript function decorators are "Higher Order Function"
"Higher Order Function" are functions that take in function and return a function
A type of function that takes in a
function and returns another function
*/

// Decorator
function addFreeItemDecorator(fn) {
    return function() {
        // fn = is the function passed in addFreeItemDecorator
        // arguments = are the arguments passed to fn
        // return = function will be called when setDetail() is called
        // this = is ItemOrder() function/class

        // Line below is an error because ...
        // fn([arguments[0] + " plus 1 free", arguments[1], arguments[2] + 1]);

        fn.apply(this, [arguments[0] + " plus 1 free", arguments[1], arguments[2] + 1]);

        console.log("Added free item by addFreeItemDecorator(fn)")
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
milkOrder.setDetail("Milk", 2, 1);
milkOrder.printDetail();
