let MultiplierClass = require("./MultiplierClass");

module.exports = class NumListMultiply {
    multiplyList(nums, multiplyBy, addTo) {
        let multiplierClass = new MultiplierClass();
        multiplierClass.setMultipier(multiplyBy);
        return nums ? nums.map((num) => {
            let result = multiplyBy ? multiplierClass.multiply(num) : num;
            result = addTo ? addTo + result : result;
            return result;
        }) : [];
    }
}