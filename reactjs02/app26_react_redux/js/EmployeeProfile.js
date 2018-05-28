import React from "react";

const EmployeeProfile = (props) => {
    return (
        <div>
            <h2>Employee Profile</h2>
            Name: {props.name}
            <br/>
            Salary: {props.salary}
            <br/>
            <button onClick={() => {props.raiseSalary(10);}} className="btn btn-primary">
                Raise Salary
            </button>
            <br/><br/>
            <button onClick={() => {props.changeName("Chaudhry");}} className="btn btn-primary">
                Change Name
            </button>
        </div>
    );
};

export default EmployeeProfile;