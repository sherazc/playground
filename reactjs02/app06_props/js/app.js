import React from "react";
import ReactDOM from "react-dom";
import SayName from "./SayName"

class App extends React.Component {
    render() {
        return (
            <div>
                <SayName name="Sheraz"/>
                <SayName wrong_prop="Test"/>
                <SayName/>
            </div>
        );
    }
}
const app = document.getElementById("app");
ReactDOM.render(<App/>, app);