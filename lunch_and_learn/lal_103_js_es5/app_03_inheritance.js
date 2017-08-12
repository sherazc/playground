var MyMath = function() {
    this.add = function (a, b) {
        return a + b;
    };
};

MyMath.prototype.subtract = function (a, b) {
    return a - b;
};

var myMath = new MyMath();
console.log(myMath.add(20, 5));
console.log(myMath.subtract(20, 5));
