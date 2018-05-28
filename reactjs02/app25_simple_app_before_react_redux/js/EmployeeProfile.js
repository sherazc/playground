import React from "react";

export default class EmployeeProfile extends React.Component {

    render() {
        return (
            <div>
                <h2>Employee Profile</h2>
                Name: {this.props.name}
                <br/>
                Salary: {this.props.salary}
                <br/>
                <button onClick={() => {
                    this.props.raiseSalary(10);
                }} className="btn btn-primary">
                    Raise Salary
                </button>
                <br/><br/>
                <button onClick={() => {
                    this.props.changeName("Chaudhry");
                }} className="btn btn-primary">
                    Change Name
                </button>
            </div>
        );
    }
}
