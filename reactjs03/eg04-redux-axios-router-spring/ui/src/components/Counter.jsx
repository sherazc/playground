import React, {Component} from "react";

export default class Counter extends Component {
    render() {
        return (
            <div>
                <h1>Counter</h1>
                <h3>8</h3>
                <button type="button">+</button>
                <button type="button">-</button>
            </div>
        );
    }
}