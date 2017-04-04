import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {

    constructor() {
        super();
        this.items = ["item1", "item2", "item3"];
    }

    render() {
        return (
            <div style={{margin: "20px"}}>
                <ul>
                    {this.items.map((item, index) => {
                        /*
                        Every JSX child created inside loop should have a unique key.
                        This helps react to distinctly refresh an element if it needs too.
                        In this example below we are just giving loop index in "key".
                        */
                        let listItem = (<li>{item}</li>);
                        return listItem;
                    })}
                </ul>
            </div>
        );
    }
}
const app = document.getElementById("app");
ReactDOM.render(<App/>, app);