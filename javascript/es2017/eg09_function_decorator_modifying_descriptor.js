// https://www.sitepoint.com/javascript-decorators-what-they-are
const readOnly = (target, name, descriptor) => {
    descriptor.writable = false;
    return descriptor;
};

class Example {
    @readOnly
    a() {}
    b() {}
}

const e = new Example();

// This line is error because we made it (writable = false) in @readOnly
// e.a = 1;

// But this line works fine
e.b = 2;

console.log("Done!");