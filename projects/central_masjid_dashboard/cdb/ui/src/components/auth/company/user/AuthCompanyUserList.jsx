import React, {Component} from "react";
import {getAllCompaniesAllUsers} from "../../../../services/auth/CompanyListService";
import {getPathParamFromProps} from "../../../../services/utilities";
import UserGrid from "./UserGrid";

class AuthCompanyUserList extends Component {
    constructor(props) {
        super(props);
        this.state = {editUserPrepared: false, users:[]};
    }

    componentDidMount() {
        const action = getPathParamFromProps(this.props, "action");
        this.updateAllOrCurrentUsers(action);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevAction = getPathParamFromProps(prevProps, "action");
        const currentAction = getPathParamFromProps(this.props, "action");
        if (currentAction !== prevAction) {
            this.updateAllOrCurrentUsers(currentAction);
        }
    }

    updateAllOrCurrentUsers(action) {
        if (action === "all") {
            getAllCompaniesAllUsers(this.updateCompaniesUsers.bind(this));
        } else {
            this.setState({users: []});
        }
    }

    updateCompaniesUsers(users) {
        this.setState({users});
    }

    editUser(userId) {
        console.log("Edit", userId);
    }

    deleteUser(userId) {
        console.log("Delete", userId);
    }

    render() {
        return(
            <div>
                <h3>User List</h3>
                <UserGrid
                    users={this.state.users}
                    editUser={this.editUser.bind(this)}
                    deleteUser={this.deleteUser.bind(this)}/>
            </div>
        );
    }
}

export default AuthCompanyUserList;