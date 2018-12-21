import React, {Component} from "react";
import {getAllCompaniesAllUsers} from "../../../../services/auth/CompanyListService";
import {getPathParamFromProps} from "../../../../services/utilities";

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

    render() {

        return(
            <div>
                Auth Company User List {this.state.users.length}
            </div>
        );
    }
}

export default AuthCompanyUserList;