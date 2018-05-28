import React from "react";
import ReactDOM from "react-dom";
// {} are used because "MyStatelessComponent" is
// not default class in "./MyStatelessComponent.js"
import {MyStatelessComponent} from "./MyStatelessComponent";

class App extends React.Component {
    render() {
        return (
            <div>
                <MyStatelessComponent name="Sheraz" age="20"/>
                <MyStatelessComponent name="Tariq" age="30"/>
            </div>
        );
    }
}
const app = document.getElementById("app");
ReactDOM.render(<App/>, app);