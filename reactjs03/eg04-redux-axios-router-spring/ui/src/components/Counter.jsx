import React, {Component} from "react";
import {connect} from 'react-redux';

class Counter extends Component {
    constructor(props) {
        super(props);

        console.log(props);
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
                <h3>{this.props.count}</h3>
                <button type="button" onClick={this.add}>+</button>
                <button type="button" onClick={this.subtract}>-</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        count: state.countReducer.count
    };
};

export default connect(mapStateToProps)(Counter);