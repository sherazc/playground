import React from "react";
import ReactDOM from "react-dom";
import ComponentA from "./ComponentA";

class Layout extends React.Component {
    render() {
        return (
            <div style={{backgroundColor: "#f2f2f2"}}>
                <h1 style={{backgroundColor: "#235612", color: "white"}}>
                    Header
                </h1>
                <ComponentA/>
                <h1 style={{backgroundColor: "#761234", color: "white"}}>
                    Footer
                </h1>
            </div>
        );
    }
}
const app = document.getElementById("app");
ReactDOM.render(<Layout/>, app);