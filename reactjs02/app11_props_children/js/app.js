import React from "react";
import ReactDOM from "react-dom";
import BoxChildren from "./BoxChildren"
class App extends React.Component {
    render() {
        return (
            <div>
                <BoxChildren>
                    Test text
                </BoxChildren>

                <BoxChildren>
                    <ul>
                        <li>item 1</li>
                        <li>item 2</li>
                    </ul>
                </BoxChildren>
            </div>
        );
    }
}
const app = document.getElementById("app");
ReactDOM.render(<App/>, app);