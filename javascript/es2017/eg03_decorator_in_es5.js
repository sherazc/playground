/*
Javascript function decorators are "Higher Order Function"
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

        

    }
}

// Class definition
function ItemOrder() {}

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
milkOrder.setDetail("Milk", 2, 2);


milkOrder.printDetail();