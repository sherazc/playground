interface I {
    propA: number;
    propB: string;
}

let myObject: I = {
    propA: 100,
    propB: "Sheraz",
    // propC: "Bad Value" // Error
};

console.log(myObject.propA, myObject.propB);