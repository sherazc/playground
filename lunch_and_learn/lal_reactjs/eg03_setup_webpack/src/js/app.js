import React from "react";
import ReactDOM from "react-dom";

import MyMath from "./services/MyMath";
import "../styles/main.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
    }

    render() {
        let myResult = new MyMath().add(3, 5);
        //Styles are created using javascript objects
        let inputStyle = {
            // Its marginRight instead of margin-right
            marginRight: "20px"
        };

        return (
            // Its className instead of class
            <div className="textWhite">
                <h1>Hello {this.name}!</h1>
                3 + 5 = {myResult}
                <div>
                    {/* Its htmlFor instead of for */}
                    <label htmlFor="userName" style={inputStyle}>User Name</label>
                    <input id="userName" />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App name="World"/>, document.getElementById("app"));