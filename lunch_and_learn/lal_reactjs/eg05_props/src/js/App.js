import React from "react";
import ReactDOM from "react-dom";
import MyComponent from "./component/MyComponent"
import "../styles/main.css";

let MyChildComponent = () => {
    return (
        <div className="boxRed">
            I am MyChildComponent
        </div>
    );
};

class App extends React.Component {
    render() {
        let myVar = "My Var Value";
        let myIntVar = 333;
        let myArray = ["element1", "element2", "element3"];
        let myObject = {
            name: "Sheraz",
            salary: 555
        };
        let myFunction = () => {
                return (
                    <div className="boxBlue">
                        I am myFunction
                    </div>
                );
            };

        return (
            <MyComponent
                staticString="Static String"
                varString={myVar}
                varInt={myIntVar}
                varArray={myArray}
                varObject={myObject}
                varFunction={myFunction}>

                String before MyChildComponent
                <br/>
                <MyChildComponent/>
                <br/>
                String after MyChildComponent

            </MyComponent>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));