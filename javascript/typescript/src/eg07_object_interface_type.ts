interface Eg07Interface {
    propA: number;
    propB: string;
}

let myObject: Eg07Interface = {
    propA: 100,
    propB: "Sheraz",
    // propC: "Bad Value" // Error
};

console.log(myObject.propA, myObject.propB);