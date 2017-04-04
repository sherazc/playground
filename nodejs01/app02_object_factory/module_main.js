// This is how we create Object Factory
// module.exports is a function that returns a Object.
// This is very similar to declaring a javascript class.
// Object Factory is a function that returns an object but class is just a function
// Object Factory don't use 'new' keyword but class does.
// Object returned are public properties. others are private;
// Both object factory and class are used to create new object in memory with its own private memory

// IF WE DON'T DO THIS THEN module.exports IS SHARED ACCROSS OTHER MODULES.
module.exports = function() {
    var privateVar01 = "privateVar01 value";
    return {
        mainModuleVar01: privateVar01 + ", mainModuleVar01 value",
        mainModuleFunction01: function() {
            console.log(this.mainModuleVar01);
        }
    };
};