import {initialStateCalculator} from "./initialStates";
import actionNames from "../actions/actionNamesConstants"

const calculatorReducer = (state = initialStateCalculator, action) => {
    switch (action.type) {
        case actionNames.ACTION_ADD:
            state = {
                ...state,
                result: state.num1 + state.num2
            };
            break;
        case actionNames.ACTION_SUBTRACT:
            state = {
                ...state,
                result: state.num1 - state.num2
            };
            break;
        case actionNames.ACTION_SET_NUM1:
            state = {
                ...state,
                num1: action.payload
            };
            break;
        case actionNames.ACTION_SET_NUM2:
            state = {
                ...state,
                num2: action.payload
            };
            break;
    }
    return state;
};

export default calculatorReducer;