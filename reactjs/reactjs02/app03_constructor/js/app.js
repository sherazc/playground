import React from "react";
import ReactDOM from "react-dom";

class Layout extends React.Component {
    constructor() {
        super();
        this.myName = "Sheraz";
    }
    render() {
        return (
            <div>
                <h1>Hi I am {this.myName}</h1>
            </div>
        );
    }
}
const app = document.getElementById("app");
ReactDOM.render(<Layout/>, app);