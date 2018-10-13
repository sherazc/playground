import React, {Component} from "react";
import {connect} from 'react-redux';
import {countAddAction, countSubtractAction} from "../store/action/counter-actions";
import history from "../app-browse-history";

class Counter extends Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.subtract = this.subtract.bind(this);
        this.goToAllUsers = this.goToAllUsers.bind(this);
    }

    add() {
        this.props.countAdd(2);
    }

    subtract() {
        this.props.countSubtract(2);
    }

    goToAllUsers() {
        history.push("/all-users");
    }

    render() {
        return (
            <div>
                <h1>Counter</h1>
                <h3>{this.props.count}</h3>
                <button type="button" onClick={this.add}>+</button>
                <button type="button" onClick={this.subtract}>-</button>
                <br/>
                <br/>
                Using history to change page. We could use this in authentication guard
                <br/>
                <button type="button" onClick={this.goToAllUsers}>Go to All User</button>
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