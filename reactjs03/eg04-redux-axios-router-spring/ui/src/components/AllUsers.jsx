import React, {Component} from "react";
import {userFetchAllAction} from "../store/action/user-actions";
import {connect} from "react-redux";

class AllUsers extends Component {
    componentDidMount() {
        this.props.fetchAll();
    }
    render() {
        return (
            <div>
                <h1>All users</h1>
            </div>
        );
    }
}

const actions = {
    fetchAll: userFetchAllAction
};

const mapStateToProps = state => {
    console.log(state);
  return {
      users: state.userReducer.users
  }
};

export default connect(mapStateToProps, actions)(AllUsers);