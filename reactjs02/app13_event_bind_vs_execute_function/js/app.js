import React from "react";
import ReactDOM from "react-dom";


class App extends React.Component {
    constructor() {
        super();
        this.age = 20;
    }

    makeOlder() {
        this.age += 3;
        this.refs.ageField.value = this.age;
    }

    handleAgeFieldOnChange(event) {
        // We should have used component's state in input values
    }

    render() {
        return (
            <div>
                My Age is = &nbsp;
                {/* Use "ref" instead of "id" to get reference to DOM elements or Nodes */}
                {/* If input value is set using Component's value then it becomes readonly
                 unless we handle change in onChange event */}

                <input ref="ageField" type="number" value={this.age}
                    onChange={this.handleAgeFieldOnChange.bind(this)}/>
                <hr/>
                <button className="btn btn-primary" onClick={this.makeOlder.bind(this)}>
                    Make Older bind
                </button>
                <hr/>
                <button className="btn btn-primary" onClick={() => {this.makeOlder()}}>
                    Make Older anonymous function
                </button>

            </div>
        );
    }
}
const app = document.getElementById("app");
ReactDOM.render(<App/>, app);