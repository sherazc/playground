import { debounce, debouncePromise } from "./Debounce";

// Business logic function
const myBusinessLogicFunction = (a: number, b: number) => {
    console.log("myBusinessLogicFunction Called", new Date());
    return a + b
}

// Convert business logic function into debounce function
const myBusinessLogicFunctionDebouncePromise = debouncePromise(myBusinessLogicFunction, 3000);

// Add onclick Event function
export const useDebouncePromise = () => {
    const buttonActivate = document.getElementById("useDebouncePromiseButton") as HTMLButtonElement;
    buttonActivate.onclick = function() {
        myBusinessLogicFunctionDebouncePromise(3, 4).then((result) => {
            console.log(result);
        })
    }    
}
