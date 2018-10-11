import React, {Component} from "react";
import {connect} from 'react-redux';
import {countAddAction, countSubtractAction} from "../store/action/counter-actions";

class Counter extends Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.add = this.add.bind(this);
        this.subtract = this.subtract.bind(this);
    }

    add() {
        this.props.countAdd(2);
    }

    subtract() {
        this.props.countSubtract(2);
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
    return {
        count: state.countReducer.count
    };
};

const actions = {
    countAdd: countAddAction,
    countSubtract: countSubtractAction
};

export default connect(mapStateToProps, actions)(Counter);