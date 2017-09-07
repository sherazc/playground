import React from "react";
import ReactDOM from "react-dom";
import MyComponent from "./component/Child"
import "../styles/main.css";
import Parent from "./component/Parent";

class App extends React.Component {
    render() {
        return (
            <div>
                <Parent/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));