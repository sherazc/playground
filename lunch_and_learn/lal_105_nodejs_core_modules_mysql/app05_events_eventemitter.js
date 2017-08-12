import EventEmitter from "events";

// Event name constants
const myEvents = {
    SALARY: "SALARY",
    NAME: "NAME"
};

// Defining Observable / Observable data / EventEmitter
class MyObservable {
    constructor(name, salary) {
        this.observableData = {
            name: name,
            salary: salary
        };
        this.eventEmitter = new EventEmitter();
    }

    setSalary(salary) {
        this.observableData.salary = salary;
        this.eventEmitter.emit(myEvents.SALARY, this.observableData);
    }

    setName(name) {
        this.observableData.name = name;
        this.eventEmitter.emit(myEvents.NAME, this.observableData);
    }

    addObserver(eventName, observer) {
        this.eventEmitter.on(eventName, observer);
    }

    removeObserver(eventName, observer) {
        this.eventEmitter.removeListener(eventName, observer)
    }
}

// Defining Observer Functions
let nameObserver = (observableData) => {
    console.log("Name Changed", observableData);
};

let salaryObserver = (observableData) => {
    console.log("Salary Changed", observableData);
};

let profileObserver = (observableData) => {
    console.log("Profile Changed", observableData);
};


// Initializing Observable/EventEmitter
let myObservable = new MyObservable("Sheraz", 100);

// Adding Observers/Listener to Events
myObservable.addObserver(myEvents.NAME, nameObserver);
myObservable.addObserver(myEvents.SALARY, salaryObserver);

// NOTE: profileObserver is added on both myEvents.NAME, and myEvents.SALARY events
myObservable.addObserver(myEvents.NAME, profileObserver);
myObservable.addObserver(myEvents.SALARY, profileObserver);

// Changing value will emit events.
// It will invoke Observer/Listener
myObservable.setName("Chaudhry");
console.log("#########");
myObservable.setSalary(1000);

// Removing Observers/Listener from Events
console.log("#########");
myObservable.removeObserver(myEvents.SALARY, salaryObserver);

// changing value after Observers/Listener is removed from Events
myObservable.setSalary(2000);




