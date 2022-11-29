import { debounceFunction } from "./Debounce";

// Business logic function
const myBusinessLogicFunction = (a: number, b: number) => {
    console.log("myBusinessLogicFunction Called", a + b, new Date());
}

// Convert business logic function into debounce function
const myBusinessLogicFunctionDebounce = debounceFunction(myBusinessLogicFunction, 3000);

// Add onclick Event function
export const useDebounce = () => {
    const buttonActivate = document.getElementById("useDebounceButton") as HTMLButtonElement;
    buttonActivate.onclick = function() {
        myBusinessLogicFunctionDebounce(1, 2);
    }    
}
