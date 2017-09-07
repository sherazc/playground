import React from "react";
import ReactDOM from "react-dom";
import MyComponent from "./component/MyComponent"
import "../styles/main.css";

class App extends React.Component {
    render() {
        return (
            <div>
                Hello World
                <MyComponent message="A Component"/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));