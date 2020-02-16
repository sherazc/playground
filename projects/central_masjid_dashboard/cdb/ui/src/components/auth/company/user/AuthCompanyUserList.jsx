import React, {Component} from "react";
import {activateUser, getAllCompaniesAllUsers, getCompanyAllUsers} from "../../../../services/auth/CompanyListService";
import {getReactRouterPathParamFromUrl, isBlank} from "../../../../services/utilities";
import UserGrid from "./UserGrid";
import {prepareCompanyUserToEdit} from "../../../../store/register-company/actions";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {isAdminLogin, isSuperAdminLogin} from "../../../../services/auth/AuthNZ";
import Layout01 from "../../../layout/Layout01/Layout01";

class AuthCompanyUserList extends Component {
    constructor(props) {
        super(props);
        this.state = {editCompanyUserPrepared: false, users: []};
        this.onActivateUser = this.onActivateUser.bind(this);
        this.activateUserCallback = this.activateUserCallback.bind(this);
    }

    componentDidMount() {
        const action = getReactRouterPathParamFromUrl(this.props, "action");
        this.updateAllOrCurrentUsers(action);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevAction = getReactRouterPathParamFromUrl(prevProps, "action");
        const currentAction = getReactRouterPathParamFromUrl(this.props, "action");
        if (currentAction !== prevAction) {
            this.updateAllOrCurrentUsers(currentAction);
        }
    }

    updateAllOrCurrentUsers(action) {
        const redirectUrl = this.getRedirectUrl(action, this.props);
        if (redirectUrl) {
            return;
        }
        if (action === "all") {
            getAllCompaniesAllUsers(this.updateCompaniesUsers.bind(this));
        } else {
            getCompanyAllUsers(this.updateCompaniesUsers.bind(this), this.props.login.company.id);
        }
    }

    updateCompaniesUsers(users) {
        this.setState({users});
    }

    editCompanyUser(userId) {
        let user = this.findUserById(this.state.users, userId);
        this.props.prepareCompanyUserToEdit(user);
        this.setState({editCompanyUserPrepared: true});
    }

    findUserById(users, userId) {
        let result = null;
        users.some(user => {
            if (userId === user.id) {
                result = user;
                return true;
            } else {
                return false;
            }
        });
        return result;
    }

    deleteCompanyUser(userId) {
        console.log("Delete user not implemented yet")
    }

    getRedirectUrl(action, props) {
        const adminLogin = isAdminLogin(props.login);
        const superAdminLogin = isSuperAdminLogin(props.login);

        if (action === "current" && !adminLogin && !superAdminLogin) {
            return `${process.env.PUBLIC_URL}/forbidden`;
        }

        if (action === "all" && !superAdminLogin) {
            return `${process.env.PUBLIC_URL}/forbidden`;
        }

        if (this.state.editCompanyUserPrepared) {
            return `${process.env.PUBLIC_URL}/auth/company/user/view`;
        }
    }

    onActivateUser(userId, active) {
        activateUser(this.activateUserCallback, userId, active);
    }

    activateUserCallback(serviceResponse) {
        if (!serviceResponse.target || isBlank(serviceResponse.target.id)) {
            return;
        }
        const updatedUser = serviceResponse.target;
        const users = this.state.users;
        let foundIndex = -1;
        users.filter((user, index) => {
            if (user.id === updatedUser.id) {
                foundIndex = index;
                return true;
            }
        });
        if (foundIndex > -1 && foundIndex < users.length) {
            users[foundIndex].active = updatedUser.active;
            this.setState({users: users});
        }
    }

    render() {
        const action = getReactRouterPathParamFromUrl(this.props, "action");
        const redirectUrl = this.getRedirectUrl(action, this.props);
        if (redirectUrl) {
            return <Redirect to={redirectUrl}/>;
        }

        return (
            <Layout01>
                <div>
                    <h1>
                        Users in&nbsp;
                        {action === "current" ? `${this.props.login.company.name}` : `all companies.`}
                    </h1>
                    <UserGrid
                        users={this.state.users}
                        onActivateUser={this.onActivateUser}
                        editCompanyUser={this.editCompanyUser.bind(this)}
                        deleteCompanyUser={this.deleteCompanyUser.bind(this)}/>
                </div>
            </Layout01>
        );
    }


}

const mapStateToProps = state => {
    return {login: state.login};
};

export default connect(mapStateToProps, {prepareCompanyUserToEdit})(AuthCompanyUserList);