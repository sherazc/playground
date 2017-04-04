import React from "react";
import ReactDOM from "react-dom";
import MyComponent from "./MyComponent"

class App extends React.Component {
    constructor() {
        super();
        this.state = {showComponent: true};
    }

    showHideComponent(event) {
        this.setState({showComponent: !this.state.showComponent});
    }

    render() {
        let componentToShow = "";
        if (this.state.showComponent) {
            componentToShow = <MyComponent componentName="MyComponent"/>;
        }

        return (
            <div className="paddedBoxYellow">
                <button className="btn btn-danger"
                    onClick={this.showHideComponent.bind(this)}>
                    Show/Hide Component
                </button>
                {componentToShow}
            </div>
        );
    }
}

const app = document.getElementById("app");
ReactDOM.render(<App/>, app);