import React, {Component} from "react";
import {connect} from "react-redux";
import {ListUsers} from "./ListUsers";

class Home extends Component{
    render() {
        return (
            <div>
                <h1>Home</h1>
                <h3>Counter</h3>
                {this.props.count}
                <h3>All users</h3>
                <ListUsers users={this.props.users}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        count: state.countReducer.count,
        users: state.userReducer.users
    };
};

export default connect(mapStateToProps)(Home);
