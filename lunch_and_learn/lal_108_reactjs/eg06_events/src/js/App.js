import React from "react";
import ReactDOM from "react-dom";
import "../styles/main.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Sheraz",
            salary: 100
        };

        this.cities = ["Alpharetta", "Roswell", "Atlanta"];

        this.city = this.cities[0];
    }

    increaseSalary() {
        this.setState({salary: this.state.salary + 1});
    }

    decreaseSalary() {
        this.setState({salary: this.state.salary - 1});
    }

    changeCity() {
        // this.city = this.cities[]
    }



    render() {
        return (
            <div>
                <strong>Profile</strong>
                <br/>
                Name: {this.state.name}
                <br/>
                Salary: {this.state.salary}
                <br/>
                City: {this.city}
                <br/>
                <div className="boxYellow">
                    <button onClick={this.increaseSalary.bind(this)} className="btn btn-success">+</button>
                    <button onClick={this.decreaseSalary.bind(this)} className="btn btn-danger" style={{marginLeft: "10px"}}>-</button>
                    <button onClick={this.decreaseSalary.bind(this)} className="btn btn-info" style={{marginLeft: "10px"}}>Change City</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));