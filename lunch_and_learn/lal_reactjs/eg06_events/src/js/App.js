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
        this.city = "Alpharetta"
    }

    increaseSalary() {
        this.setState({salary: this.state.salary + 1});
    }

    decreaseSalary() {
        this.setState({salary: this.state.salary - 1});
    }

    changeCity() {
        if(this.city === "Alpharetta"){
            this.city = "Roswell";
        } else {
            this.city = "Alpharetta";
        }
    }

    render() {
        console.log("Running render: ", new Date());
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
                    <button onClick={this.changeCity.bind(this)} className="btn btn-info" style={{marginLeft: "10px"}}>Change City</button>
                </div>
                <p>
                    Note Change City do not work because this.city is not property under this.state
                    <br/>
                    Only changes to this.state makes the component re-render.
                    <br/>
                    But on clicking Change City changes this.city in memory.
                    <br/>
                    Try clicking Change City and then click + and watch city change.
                </p>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));