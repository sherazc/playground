module.exports = class MultiplierClass {
    setMultipier(multiplier) {
        this.multiplier = multiplier;
    }

    multiply(num) {
        return this.multiplier ? this.multiplier * num : num;
    }
}