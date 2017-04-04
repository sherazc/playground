class A {
    show1(): void {
        console.log("I am A 1");
    }
}

class B extends A {
    show1(): void {
        console.log("I am B 1");
    }

    show2(): void {
        console.log("I am B 2");
    }
}

let obj1 = new A();
let obj2 = new B();

obj1.show1();
obj2.show1();
obj2.show2();
