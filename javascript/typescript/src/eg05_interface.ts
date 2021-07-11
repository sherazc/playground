interface Eg05Interface {
    show(): void;
}

class Eg05Class implements Eg05Interface {
    show(): void {
        console.log("I am C")
    }
}

new Eg05Class().show();