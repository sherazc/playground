interface I {
    show(): void;
}

class C implements I {
    show(): void {
        console.log("I am C")
    }
}

new C().show();