// Cons: Can not return value

export const debounce = (func: Function, delay = 1000) => {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}


export const debouncePromise = (inner: Function, ms: number = 1000) => {
    let timer: NodeJS.Timeout;
    let resolves: any = [];

    return function (...args: any[]) {
        // Run the function after a certain amount of time
        clearTimeout(timer);
        timer = setTimeout(() => {
            // Get the result of the inner function, then apply it to the resolve function of
            // each promise that has been created since the last time the inner function was run
            let result = inner(...args);
            resolves.forEach((r: (arg0: any) => {}) => r(result));
            resolves = [];
        }, ms);

        return new Promise(r => resolves.push(r));
    };
}
