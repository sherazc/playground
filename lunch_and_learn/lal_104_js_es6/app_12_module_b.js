let myObj2 = {
    func1: function () {
        console.log("I am module_b func1");
    }
};

let func2 = function () {
    console.log("I am module_b func2")
};

let func3 = function () {
    console.log("I am module_b func3")
};

export {myObj2 as default, func2, func3}