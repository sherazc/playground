const greeting = (greetingText) => {
    return (targetFunctionClass, functionName, descriptor) => {

        let originalFunction = descriptor.value;
        descriptor.value = (personName) => {
            return `${greetingText} ${originalFunction.apply(this, [personName])}`;
        };

        return descriptor;
    }
};

class Person {
    @greeting("Hello")
    sayMyName(personName) {
        return personName;
    }
}

const person = new Person();

console.log(person.sayMyName("Sheraz"));