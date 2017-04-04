import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    constructor() {
        super();
        this.state = {name: ""};
    }

    handleInputChange(event) {
        // "event.target" points to element that triggered it.
        // In this example its <input /> element.
        this.setState({name: event.target.value});
    }

    render() {
        if (this.state.name == "") {
            this.state.name = this.props.defaultName;
        }
        /*
         To access Component methods like "setState()" we have to .bind(this)
         to change context.
         By doing this "this" inside "handleInputChange()" points to
         Component not <input /> element.
         */
        return (
            <div>
                <h1>Hi my name is {this.state.name}</h1>
                <input onChange={this.handleInputChange.bind(this)}></input>
            </div>
        );
    }
}
const app = document.getElementById("app");
ReactDOM.render(<App defaultName="No Name"/>, app);