// https://www.sitepoint.com/javascript-decorators-what-they-are

function readOnly(target, name, descriptor) {
    console.log(target);
    return descriptor;
}


@readOnly()
class Example {
    a() {}


    b() {}
}

const e = new Example();

e.a = 1;