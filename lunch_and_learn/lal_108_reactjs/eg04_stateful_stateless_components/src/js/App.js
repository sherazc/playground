import React from "react";
import ReactDOM from "react-dom";

import StatelessHeader from "./components/StatelessHeader"
import StatefulHome from "./components/StatefulHome"
import "../styles/main.css";

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <StatelessHeader title="React Home"/>
                </div>
                <div className="row">
                    <StatefulHome/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));