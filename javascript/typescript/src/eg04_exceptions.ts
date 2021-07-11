function validate(str: string): boolean{
    if (str == null || str.length < 1) {
        throw "Invalid String";
    } else {
        return true;
    }
}

try {
    console.log("Sheraz = " + validate("Sheraz"));
    // @ts-ignore
    console.log(" = " + validate(null));
} catch (e) {
    console.log(e)
}