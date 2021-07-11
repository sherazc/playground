/****************
 * Boolean
 ***************/
let isDone: boolean = false;

/****************
 * Number
 ***************/
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

/****************
 * String
 ****************/

let color: string = "blue";
color = 'red';
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;

/****************
 * Array
 ***************/
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

/****************
 * Tuple
 ***************/
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
//x = [10, "hello"]; // Error

console.log(x[0].substr(1)); // OK
//console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

// x[3] = "world"; // OK, 'string' can be assigned to 'string | number'

// console.log(x[5].toString()); // OK, 'string' and 'number' both have 'toString'

// x[6] = true; // Error, 'boolean' isn't 'string | number'


/****************
 * Enum
 ***************/
enum Color1 {Red, Green, Blue};
let c1: Color1 = Color1.Green;

enum Color2 {Red = 1, Green, Blue};
let c2: Color2 = Color2.Green;

enum Color3 {Red = 1, Green = 2, Blue = 4};
let c3: Color3 = Color3.Green;

enum Color4 {Red = 1, Green, Blue};
let colorName: string = Color4[2];

console.log(colorName);


/****************
 * Any
 ***************/
let notSure1: any = 4;
notSure1 = "maybe a string instead";
notSure1 = false; // okay, definitely a boolean

let notSure2: any = 4;
// notSure2.ifItExists(); // okay, ifItExists might exist at runtime
// notSure2.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
//prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

let list3: any[] = [1, true, "free"];
list3[1] = 100;

/****************
 * Void
 ***************/
function warnUser(): void {
    console.log("This is my warning message");
}

let unusable: void = undefined;

/****************
 * Null and Undefined
 ***************/
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;

/****************
 * Never
 ***************/

// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}

// Inferred return type is never
function fail() {
    return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while (true) {
    }
}

/****************
 * Type assertions
 ***************/
let someValue1: any = "this is a string";
let strLength1: number = (<string>someValue1).length;
let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;


