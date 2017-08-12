class MyClassA {
    constructor(arg1) {
        let privateVar1 = 10;
        this.publicVar1 = arg1 * 2;
        this.getPrivateVar1 = () => privateVar1;
        this.setPrivateVar1 = newPrivateVar1 => {privateVar1 = newPrivateVar1;}
    }

    processA() {
        return this.getPrivateVar1() + this.publicVar1;
    }
}

class MyClassB extends MyClassA {
    constructor() {
        super(20);
    }

    processB() {
        return this.processA() + 5;
    }
}

(function() {
    let myClassB = new MyClassB();
    console.log(myClassB.processB());
})();