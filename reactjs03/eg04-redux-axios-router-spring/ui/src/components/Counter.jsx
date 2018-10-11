import React, {Component} from "react";

export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.subtract = this.subtract.bind(this);
    }

    add() {
        console.log("add ", new Date());
    }

    subtract() {
        console.log("subtract ", new Date());
    }

    render() {
        return (
            <div>
                <h1>Counter</h1>
                <h3>8</h3>
                <button type="button" onClick={this.add}>+</button>
                <button type="button" onClick={this.subtract}>-</button>
            </div>
        );
    }
}