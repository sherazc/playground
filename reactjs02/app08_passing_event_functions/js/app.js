import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout"

class App extends React.Component {
    render() {
        return (
            <div>
                <Layout/>
            </div>
        );
    }
}
const app = document.getElementById("app");
ReactDOM.render(<App/>, app);