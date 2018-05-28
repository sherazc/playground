import React from "react";
import ReactDOM from "react-dom";
import Company from "./Company";
import {createStore, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux";
import logger from "redux-logger"

/*
Guidelines for using Redux:
- If a state or functions that changes state are used across
  multiple component then use Redux to manage that state object
- If a state and function that change state are only being used
  within a component or is manageable across few component then
  don't use Redux

To connect ReactJS with Redux.
- We have to surround main root component with <Provider/>
- In our component we have to define
    -- mapStateToProps function
    -- mapDispatchToProps function
- pass mapStateToProps, and mapDispatchToProps to connect() function
- Connect return a function this function will connect our React
  component to Redux
- Object that is returned in the last step will be used from there
  onwords
*/

const initialEmployeeState = {
    employeeName: "Sheraz",
    salary: 1000
};


const employeeReducer = (state = initialEmployeeState, action) => {
    switch (action.type) {
        case "EMPLOYEE_RAISE_SALARY":
            state = {
                ...state,
                salary: state.salary + action.payload.raiseAmount
            };
            break;
        case "EMPLOYEE_CHANGE_NAME":
            state = {
                ...state,
                employeeName: action.payload.employeeName
            };
            break;
    }
    return state;
};

/*
This store keeps track of global state. Global state have
sub-states which belong to each reducer
*/
const store = createStore(combineReducers({employeeState:employeeReducer}),
    {},
    applyMiddleware(logger()));

const app = document.getElementById("app");

ReactDOM.render(<Provider store={store}><Company /></Provider>, app);