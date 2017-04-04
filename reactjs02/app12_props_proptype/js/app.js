import React from "react";
import ReactDOM from "react-dom";
import MyPropHandler from "./MyPropHandler";

class App extends React.Component {
    render() {
        let myObject = {
            name: "Sheraz",
            age: 20
        };
        let myArray = [3,2,1];
        let myInt = 10;
        let myString = `Important message`;
        let myDate = new Date();
        let myDouble = 20.02;

        return (
            <div>
                <MyPropHandler
                    propObject={myObject}
                    propArray={myArray}
                    propInt={myInt}
                    propString={myString}
                    propDate={myDate}
                    propDouble={myDouble}>
                    <span>
                        Children element
                    </span>
                </MyPropHandler>
            </div>
        );
    }
}
const app = document.getElementById("app");
ReactDOM.render(<App/>, app);
