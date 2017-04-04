import React from "react";
import EmployeeProfile from "./EmployeeProfile";
import {connect} from "react-redux";

/*
We can convert our components to stateless/Dumb/Presentation component.
Because component is not creating state or managing it. It using props
to access state and actions that are managed by Redux.
*/
const Company = (props) => {
        return (
            <div className="paddedBoxGreen">
                <EmployeeProfile
                    changeName={() => props.changeEmployeeName("Chaudhry")}
                    raiseSalary={() => props.increaseSalary(10)}
                    salary={props.employeeState.salary}
                    name={props.employeeState.employeeName}
                />
            </div>
        );
};

/*
Tells which global state properties do this component needs to look at.
"state" object argument is the global state object
*/
const mapStateToProps = (state) => {

    /*
    Below return object create this component's properties and points them
    to sub-states of the global state.

    It will create this.props.employeeStateProp which points
    to state.employeeState that was created in createStore()
    */
    return {
        employeeState: state.employeeState
    };
};


/*
This function maps dispatch actions to component's properties.
Each action is dispatched by function. These functions
will be used by our component when then need to dispatch action.
*/
const mapDispatchToProps = (dispatch) => {
    return {
        changeEmployeeName: (name) => {
            dispatch({
                type: "EMPLOYEE_CHANGE_NAME",
                payload: {
                    employeeName: name
                }
            });
        },
        increaseSalary: (amountToIncrease) => {
            dispatch({
                type: "EMPLOYEE_RAISE_SALARY",
                payload: {
                    raiseAmount: amountToIncrease
                }
            });
        }
    };
};

/*
connect() method sets state and dispatch/action required to a
component, to its props.

IMPORTANT:
We can have multiple connect() methods in an application.
Component that does not require direct access to state and
dispatch/action then there is no need to create a connect().
Any component that need access to state should have its own
connect() method. Otherwise we will get into unintended consequences
like <input> losing focus on every keystroke.
*/
export default connect(mapStateToProps, mapDispatchToProps)(Company);