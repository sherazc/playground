import React from "react";
import EmployeeProfile from "./EmployeeProfile";

export default class Company extends React.Component {
    constructor() {
        super();
        this.state = {
            employeeName: "Sheraz",
            salary: 1000
        };
    }

    increaseSalary(inscreseAmount) {
        this.setState({
            salary: this.state.salary + inscreseAmount
        });
    }

    changeEmployeeName(newName) {
        this.setState({
            employeeName: newName
        });
    }

    render() {
        return (
            <div className="paddedBoxGreen">
                <EmployeeProfile
                    changeName={this.changeEmployeeName.bind(this)}
                    raiseSalary={this.increaseSalary.bind(this)}
                    salary={this.state.salary}
                    name={this.state.employeeName}
                />
            </div>
        );
    }
}
