// https://en.wikipedia.org/wiki/Fluent_interface
// https://www.youtube.com/watch?v=d8CDFsQHZpE&t=210s
var fluent = function(fn) {
    return function (...args) {
        fn.apply(this, args);
        return this;
    }
};

// Class Definition
var MyClass = function() {};

MyClass.prototype.setName = fluent(function(name) {
    this.name = name;
});

MyClass.prototype.sayHello = fluent(function() {
    console.log("Hello " + this.name);
});


var myClass = new MyClass();
myClass.setName("Sheraz").sayHello().setName("Chaudhry").sayHello();
